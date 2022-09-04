import { useState, useEffect, useRef } from "react";
import Router from "next/router";

import styles from "styles/components/PostSearch.module.scss";

export default function PostSearch({ input, posts, allTags, shown }) {
  const inputBox = useRef(null);
  const [val, setVal] = useState(input);

  let inputValueLower;
  let use = [];

  function change(e) {
    inputBox.current.focus();

    if (typeof e === "string") {
      inputValueLower = e;
      inputBox.current.value = e;
    } else {
      inputValueLower = inputBox.current.value.toLowerCase();
    }
    setVal(inputBox.current.value);

    // With Tag prefix
    if (inputValueLower.startsWith("tag:")) {
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

  useEffect(() => {
    change(input);
  }, []);

  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/blog") {
      if (val === "" || val === undefined) {
        Router.push("/blog");
        return;
      }
      Router.push(`/blog?input=${val}`);
    }
  }, [val]);

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="post-search">
        <i className="fa-solid fa-magnifying-glass fa-2xl" size="4x"></i>
      </label>

      <input
        type="text"
        name="post-search"
        className={styles.postSearch}
        onChange={change}
        placeholder="Search (tag: for tags)"
        ref={inputBox}
        // value={val}
      />
    </div>
  );
}
