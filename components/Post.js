import Link from "next/link";
import styles from "styles/Blog.module.scss";

import { v4 as uuidv4 } from "uuid";

export default function Post({ postData, content }) {
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
}
