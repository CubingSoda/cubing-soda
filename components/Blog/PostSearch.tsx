import { useEffect, useContext } from "react";
import { AppContext } from "components/AppProvider";

import Router, { useRouter } from "next/router";

import styles from "styles/components/PostSearch.module.scss";

interface PostSearchProps {}

const PostSearch: React.FC<PostSearchProps> = () => {
  const router = useRouter();
  const app = useContext(AppContext);

  // set input box based on url
  useEffect(() => {
    const query = router.query;
    if (!query.search) return;

    if (!query.search || query.search === "") {
      Router.push("/blog");
      return;
    }

    app.setSearchBox(query.search);
  }, [router.isReady]);

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
        onChange={() => {
          app.setSearchBox(app.searchRef.current.value);
        }}
        ref={app.searchRef}
      />
    </div>
  );
};

export default PostSearch;
