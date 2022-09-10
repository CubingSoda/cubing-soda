import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter, Router } from "next/router";

import UI from "components/UI";

import { getAllPosts } from "lib/blog-api";
import Post from "components/Blog/Post";
import PostSearch from "components/Blog/PostSearch";
import TagSuggestions from "components/Blog/TagSuggestions";

import styles from "styles/Blog.module.scss";

interface PostProps {
  allPosts: [
    {
      slug: string;
      title: string;
      desc: string;
      date: string;
      tags: string[];
      content: string;
    }
  ];
  allTags: string[];
}

const SinglePost = ({ allPosts, allTags }) => {
  const [ready, setReady] = useState(null);
  const [suggest, setSuggest] = useState(false);
  const [shown, setShown] = useState(allPosts);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return null;
    else {
      setReady(true);
    }
  }, [router.isReady]);

  if (ready === null) {
    return null;
  }

  let allTagsList = allTags
    .map((item) => {
      return Object.values(item).flat();
    })
    .flat();

  allTagsList = [...new Set(allTagsList)];

  return (
    <UI page="Blog" keywords={["blog"]}>
      {ready ? (
        <div className={styles.wrapper}>
          <PostSearch
            posts={allPosts}
            allTags={allTagsList}
            shown={setShown}
            suggest={setSuggest}
          />

          <TagSuggestions suggest={suggest} allTags={allTagsList} />

          {shown.map((post) => {
            return <Post postData={post} key={uuidv4()} />;
          })}
        </div>
      ) : null}
    </UI>
  );
};

export default SinglePost;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "slug",
    "title",
    "date",
    "tags",
    "desc",
    "content",
  ]);

  const allTags = getAllPosts(["tags"]);

  return {
    props: { allPosts, allTags },
  };
}
