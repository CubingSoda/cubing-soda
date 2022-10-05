import { useContext } from "react";
import { AppContext } from "components/AppProvider";
import { v4 as uuidv4 } from "uuid";

import styles from "styles/Blog.module.scss";

export default function TagSuggestions() {
  function click(tag) {
    if (app.searchRef.current.value.replaceAll(" ", "") === "tag:") {
      app.setSearchBox(`tag: ${tag}`);
      return;
    }

    if (!app.searchRef.current.value.includes(tag)) {
      app.setSearchBox(`${app.searchRef.current.value}, ${tag}`);
    }
  }

  const app = useContext(AppContext);

  return (
    <div>
      {app.suggestTags ? (
        <div className={`${styles.tagSuggestions} ${styles.tags}`}>
          {app.allTags.map((tag) => {
            return (
              <span
                className={styles.tag}
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
      ) : (
        // <>dfdf</>
        <div className={styles.tagHint}>
          Use{" "}
          <code
            onClick={() => {
              app.setSearchBox("tag: ");
            }}
          >
            tag:
          </code>{" "}
          to search tags
        </div>
      )}
    </div>
  );
}
