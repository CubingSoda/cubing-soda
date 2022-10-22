import { useEffect, useContext } from "react";
import { AppContext } from "components/AppProvider";

import UI from "components/UI";
import { useRouter } from "next/router";

import * as API from "lib/blog-api";
import markdownToHtml from "lib/md-to-html";

import Post from "components/Blog/Post";
import styles from "styles/Blog.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    desc: string;
    date: string;
    tags: string[];
    content: string;
  };
  allPosts: [];
  allTags: string[];
}

const SinglePost: React.FC<PostProps> = ({ post, allPosts, allTags }) => {
  const app = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // url query
    const query = router.query;
    app.setQuery(query.search);

    app.setAllTags(allTags);
    app.setAllPosts(allPosts);

    if (!query.search || query.search === "") {
      app.setShown(allPosts);
    }

    // all tags
    let allTagsList = allTags
      .map((item) => {
        return Object.values(item).flat();
      })
      .flat();

    allTagsList = [...new Set(allTagsList)];
    app.setAllTags(allTagsList);
  }, [router.isReady]);

  return (
    <UI page={post.title} desc={post.desc} keywords={post.tags}>
      <div className={styles.wrapper}>
        <Post postData={post} content fullPost />
      </div>
    </UI>
  );
};

export default SinglePost;

export async function getStaticProps({ params }) {
  const post = API.getPostBySlug(params.slug, [
    "slug",
    "title",
    "desc",
    "date",
    "tags",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  // new
  const allPosts = API.getAllPosts([
    "slug",
    "title",
    "date",
    "tags",
    "desc",
    "content",
  ]);

  const allTags = API.getAllPosts(["tags"]);

  return {
    props: {
      allPosts,
      allTags,
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = API.getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
