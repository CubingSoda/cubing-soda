import { useContext } from "react";
import { AppContext } from "components/AppProvider";

import { v4 as uuidv4 } from "uuid";

import styles from "styles/Blog.module.scss";

export default function TagSuggestions() {
  function click(tag) {
    // second click
    if (app.selectedTags.includes(tag.toLowerCase().replaceAll(" ", ""))) {
      app.secondClick(tag);
    }

    if (app.searchBox.replaceAll(" ", "") === "tag:") {
      app.setSearchBox(`tag: ${tag}`);
      return;
    }

    if (!app.searchBox.includes(tag)) {
      app.setSearchBox(`${app.searchBox}, ${tag}`);
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
                className={`${styles.tag} ${tag
                  .toLowerCase()
                  .replaceAll(" ", "")}
          
                  ${
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
      ) : (
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
