import UI from "components/UI";

import * as API from "lib/blog-api";
import markdownToHtml from "lib/markdown-to-html";

import Post from "components/Blog/Post";
import styles from "styles/Blog.module.scss";

export default function SinglePost({ post }) {
  return (
    <UI page={post.title} desc={post.desc} keywords={post.tags}>
      <div className={styles.wrapper}>
        <Post postData={post} content />
      </div>
    </UI>
  );
}

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

  return {
    props: {
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
