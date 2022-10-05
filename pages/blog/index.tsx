import { useState, useEffect, useContext } from "react";
import { AppContext } from "components/AppProvider";

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

const PostsPage = ({ allPosts, allTags }) => {
  const app = useContext(AppContext);

  const router = useRouter();

  useEffect(() => {
    // url query
    app.setQuery(router.query.search);

    app.setAllTags(allTags);
    app.setAllPosts(allPosts);
    app.setShown(allPosts);

    // all tags
    let allTagsList = allTags
      .map((item) => {
        return Object.values(item).flat();
      })
      .flat();

    allTagsList = [...new Set(allTagsList)];
    app.setAllTags(allTagsList);
  }, [router.isReady]);

  return (
    <UI page="Blog" keywords={["blog"]}>
      <div className={styles.wrapper}>
        <PostSearch />

        <TagSuggestions />
        {app.shown !== null
          ? app.shown.map((post) => {
              return <Post postData={post} key={uuidv4()} />;
            })
          : ""}
      </div>
    </UI>
  );
};

export default PostsPage;

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
