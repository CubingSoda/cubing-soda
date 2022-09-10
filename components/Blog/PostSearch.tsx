import { useEffect, useRef } from "react";
import Router from "next/router";

import styles from "styles/components/PostSearch.module.scss";

interface PostSearchProps {
  posts: {
    slug?: string;
    title?: string;
    desc?: string;
    date?: string;
    tags?: string[];
    content?: string;
  }[];
  allTags: string[];
  shown: (list) => void;
  suggest: (list) => void;
}

const PostSearch: React.FC<PostSearchProps> = ({
  posts,
  allTags,
  shown,
  suggest,
}) => {
  const searchRef = useRef(null);

  // if ?input=something, then change input value
  // else clear input value and go to /blog
  useEffect(() => {
    searchRef.current.focus();

    const { query } = Router;

    if (!query.search || query.search === "") {
      Router.push("/blog");
      return;
    }

    change(query.search);
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
      Router.push(`/blog?search=${val}`);
    }

    searchRef.current.value = val;
    searchRef.current.focus();
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
  process.env.VAL = searchRef.current ? searchRef.current.value : "";

  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="post-search">
        <i className="fa-solid fa-magnifying-glass fa-2xl" data-size="4x"></i>
      </label>

      <input
        type="text"
        name="post-search"
        placeholder="Search..."
        className={styles.postSearch}
        onChange={change}
        ref={searchRef}
      />
    </div>
  );
};

export default PostSearch;
