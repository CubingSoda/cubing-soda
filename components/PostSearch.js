import styles from "styles/components/PostSearch.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PostSearch({ posts, shown }) {
  const [input, setInput] = useState("");

  let inputValueLower;
  let use = [];

  function change(e) {
    setInput(e.target.value);
    inputValueLower = e.target.value.toLowerCase();

    posts.forEach((post) => {
      if (
        post.title.toLowerCase().includes(inputValueLower) ||
        post.date.toLowerCase().includes(inputValueLower) ||
        post.desc.toLowerCase().includes(inputValueLower)
      ) {
        use.push(post);
      }
    });
    shown(use);
    use = [];
  }

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="post-search">
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.postSearchIcon}
          size="4x"
        />
      </label>

      <input
        type="text"
        name="post-search"
        className={styles.postSearch}
        onChange={change}
        placeholder="Search Posts..."
      />
    </div>
  );
}
