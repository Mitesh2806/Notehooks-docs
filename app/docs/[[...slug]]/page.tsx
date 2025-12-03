import { page_routes } from "@/app/lib/routes-config";
import { notFound } from "next/navigation";
import { getCompiledDocsForSlug, getDocFrontmatter } from "@/app/lib/markdown-config";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const params = await props.params;
  const { slug = [] } = params;

  const pathName = slug.join("/");
  const res = await getCompiledDocsForSlug(pathName);

  if (!res) notFound();

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 mt-0">
        {res.frontmatter.title as string}
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 mt-0">
        {res.frontmatter.description as string}
      </p>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-h2:mt-8 prose-h3:mt-6 prose-h4:mt-6">
        {res.content}
      </div>
    </article>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { slug = [] } = params;
  const pathName = slug.join("/");
  const res = await getDocFrontmatter(pathName);
  if (!res) return {};
  return {
    title: `${res.title} - Notehooks`,
    description: res.description,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}