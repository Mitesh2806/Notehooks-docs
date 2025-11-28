import { page_routes } from "@/app/lib/routes-config";
import { notFound } from "next/navigation";
import { getCompiledDocsForSlug, getDocFrontmatter } from "@/app/lib/markdown-config";
import { TableOfContents } from "@/components/table-of-contents";

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
    <div className="flex gap-8 px-8 py-10">
      <article className="flex-1 max-w-3xl mx-auto">
        <div className="typography">
          <h1 className="text-3xl font-bold mb-2">
            {res.frontmatter.title as string}
          </h1>
          <p className="text-muted-foreground mb-8">
            {res.frontmatter.description as string}
          </p>
          <div>{res.content}</div>
        </div>
      </article>
      
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-24">
          <TableOfContents />
        </div>
      </aside>
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { slug = [] } = params;
  const pathName = slug.join("/");
  const res = await getDocFrontmatter(pathName);
  if (!res) return {};
  return {
    title: `${res.title} - My Docs`,
    description: res.description,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}