import { useEffect, useRef } from "react";
import Router from "next/router";

import styles from "styles/components/PostSearch.module.scss";

export default function PostSearch({ posts, allTags, shown, suggest }) {
  const inputRef = useRef(null);

  // if ?input=something, then change input value
  // else clear input value and go to /blog
  useEffect(() => {
    inputRef.current.focus();

    const { query } = Router;

    if (!query.input || query.input === "") {
      Router.push("/blog");
      return;
    }

    change(query.input);
  }, []);

  // When input changes, change shown posts
  function change(e) {
    let val;
    let use = [];

    if (typeof e === "string") {
      val = e;
    } else {
      val = e.target.value;
    }

    if (val === "") {
      Router.push("/blog");
    } else {
      Router.push(`/blog?input=${val}`);
    }

    inputRef.current.value = val;
    inputRef.current.focus();
    val = val.toLowerCase();

    // With Tag prefix
    if (val.startsWith("tag:")) {
      suggest(true);

      const allTagsLower = allTags.map((item) => {
        return item.toLowerCase().replaceAll(" ", "");
      });

      let validTags = [];
      val
        .slice(4)
        .split(",")
        .map((tag) => {
          return tag.toLowerCase().replaceAll(" ", "");
        })
        .forEach((tag) => {
          if (allTagsLower.includes(tag)) {
            validTags.push(tag);
          }
        });

      validTags.forEach((validTag) => {
        posts.forEach((post) => {
          post.tags.forEach((tag) => {
            if (tag.toLowerCase().replaceAll(" ", "") === validTag) {
              use.push(post);
            }
          });
        });
      });

      // without tag prefix
    } else {
      suggest(false);

      posts.forEach((post) => {
        if (
          post.title.toLowerCase().includes(val) ||
          post.date.toLowerCase().includes(val) ||
          post.desc.toLowerCase().includes(val) ||
          post.content.toLowerCase().includes(val)
        ) {
          use.push(post);
        }
      });
    }

    shown([...new Set(use)]); // remove duplicates
  }

  process.env.CHANGE = change;
  process.env.VAL = inputRef.current ? inputRef.current.value : "";

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="post-search">
        <i className="fa-solid fa-magnifying-glass fa-2xl" size="4x"></i>
      </label>

      <input
        type="text"
        name="post-search"
        placeholder="Search..."
        className={styles.postSearch}
        onChange={change}
        ref={inputRef}
      />
    </div>
  );
}
