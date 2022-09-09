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
    const inputValueLower = val.toLowerCase();

    inputRef.current.focus();

    // With Tag prefix
    if (inputValueLower.startsWith("tag:")) {
      suggest(true);
      const allTagsLower = allTags.map((item) => {
        return item.toLowerCase().replaceAll(" ", "");
      });

      let typedTags = inputValueLower.slice(4).split(",");
      typedTags = typedTags.map((tag) => {
        return tag.toLowerCase().replaceAll(" ", "");
      });

      let validTags = [];
      typedTags.forEach((tag) => {
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
          post.title.toLowerCase().includes(inputValueLower) ||
          post.date.toLowerCase().includes(inputValueLower) ||
          post.desc.toLowerCase().includes(inputValueLower) ||
          post.content.toLowerCase().includes(inputValueLower)
        ) {
          use.push(post);
        }
      });
    }

    shown([...new Set(use)]); // remove duplicates
    use = [];
  }

  process.env.CHANGE = change;

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
