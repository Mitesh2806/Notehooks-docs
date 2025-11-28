import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { promises as fs } from "fs";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import matter from "gray-matter";

// Define your custom components to use inside MDX
const components = {
  // Add your custom UI components here, e.g., Pre, Note, Tabs
};

export async function getCompiledDocsForSlug(slug: string) {
  const contentPath = path.join(process.cwd(), "/contents/docs/", `${slug}/index.mdx`);
  
  try {
    const rawMdx = await fs.readFile(contentPath, "utf-8");
    return await compileMDX({
      source: rawMdx,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            rehypeCodeTitles,
            rehypePrism,
            rehypeSlug,
            rehypeAutolinkHeadings,
          ],
          remarkPlugins: [remarkGfm],
        },
      },
      components,
    });
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function getDocFrontmatter(slug: string) {
    // Helper to get just metadata for SEO
    const contentPath = path.join(process.cwd(), "/contents/docs/", `${slug}/index.mdx`);
    try {
        const rawMdx = await fs.readFile(contentPath, "utf-8");
        return matter(rawMdx).data;
    } catch {
        return undefined;
    }
}