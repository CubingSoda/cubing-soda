import React from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

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
  return (
    <>
      <section className={styles.post} key={uuidv4()}>
        <div className={styles.name}>{postData.title}</div>
        <div className={styles.date}>{postData.date}</div>
        <div className={styles.tags}>
          {postData.tags.map((tag) => {
            return (
              <span className={styles.tag} key={uuidv4()}>
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
