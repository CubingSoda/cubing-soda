import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import UI from "components/UI";

import { getAllPosts } from "lib/posts-api";
import Post from "components/Post";
import PostSearch from "components/PostSearch";

import styles from "styles/Posts.module.scss";

export default function SinglePost({ allPosts }) {
  const [shown, setShown] = useState(allPosts);

  return (
    <UI page="Posts" keywords={["posts"]}>
      <div className={styles.wrapper}>
        <PostSearch posts={allPosts} shown={setShown} />

        {shown.map((post) => {
          return <Post postData={post} key={uuidv4()} />;
        })}
      </div>
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

  return {
    props: { allPosts },
  };
}
