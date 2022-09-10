import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "lib/blog");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

interface Post {
  slug?: string;
  title?: string;
  desc?: string;
  date?: string;
  tags?: string[];
  content?: string;
}

export function getPostBySlug(slug, fields = []): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs: string[] = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((a, b) => {
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
  return posts;
}
