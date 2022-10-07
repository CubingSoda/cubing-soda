import React from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import { useContext } from "react";
import { AppContext } from "components/AppProvider";

import styles from "styles/Blog.module.scss";

interface PostProps {
  postData: {
    slug: string;
    title: string;
    desc: string;
    date: string;
    tags: string[];
    content: string;
  };
  content?: boolean;
}

const Post: React.FC<PostProps> = ({ postData, content }) => {
  // https://stackoverflow.com/a/5767357/17556679
  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function click(tag) {
    if (
      app.searchBox.replaceAll(" ", "") === "" ||
      app.searchBox.toLowerCase().replaceAll(" ", "") === "tag:"
    ) {
      app.setSearchBox(`tag: ${tag}`);
      return;
    }

    if (!app.searchBox.includes(tag)) {
      app.setSearchBox(`${app.searchBox}, ${tag}`);
    }
  }

  const app = useContext(AppContext);

  return (
    <>
      <section className={styles.post} key={uuidv4()}>
        <div className={styles.name}>{postData.title}</div>
        <div className={styles.date}>{postData.date}</div>
        <div className={styles.tags}>
          {postData.tags.map((tag) => {
            return (
              <span
                className={`${styles.tag} ${
                  app.selectedTags.includes(
                    tag.toLowerCase().replaceAll(" ", "")
                  )
                    ? styles.tagSelected
                    : ""
                }`}
                key={uuidv4()}
                onClick={() => {
                  click(tag);
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <div className={styles.contentDesc}>
          <div
            dangerouslySetInnerHTML={{
              __html: content ? postData.content : postData.desc,
            }}
          />
        </div>

        {!content ? (
          <Link href={`/blog/${postData.slug}`}>
            <a className={styles.viewArticle}>VIEW ARTICLE</a>
          </Link>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Post;
