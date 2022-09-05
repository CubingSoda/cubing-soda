import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter, Router } from "next/router";

import UI from "components/UI";

import { getAllPosts } from "lib/blog-api";
import Post from "components/Blog/Post";
import PostSearch from "components/Blog/PostSearch";
import TagSuggestions from "components/Blog/TagSuggestions";

import styles from "styles/Blog.module.scss";

export default function SinglePost({ allPosts, allTags }) {
  const [ready, setReady] = useState(null);
  const [shouldISuggest, setShouldISuggest] = useState(false);

  const router = useRouter();
  const { x } = router.query;
  const [input, setInput] = useState(x ? x : "");

  useEffect(() => {
    if (!router.isReady) return null;
    else {
      setReady(true);
    }
  }, [router.isReady]);

  const [shown, setShown] = useState(allPosts);

  if (ready === null) {
    return null;
  }

  return (
    <UI page="Blog" keywords={["blog"]}>
      {ready ? (
        <div className={styles.wrapper}>
          <PostSearch
            posts={allPosts}
            allTags={[
              ...new Set(
                allTags
                  .map((item) => {
                    return Object.values(item).flat();
                  })
                  .flat()
              ),
            ]}
            shown={setShown}
            suggest={setShouldISuggest}
            input={input}
            setInput={setInput}
          />

          <TagSuggestions
            suggest={shouldISuggest}
            allTags={[
              ...new Set(
                allTags
                  .map((item) => {
                    return Object.values(item).flat();
                  })
                  .flat()
              ),
            ]}
            input={input}
            setInput={setInput}
          />

          {shown.map((post) => {
            return <Post postData={post} key={uuidv4()} />;
          })}
        </div>
      ) : null}
    </UI>
  );
}

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
