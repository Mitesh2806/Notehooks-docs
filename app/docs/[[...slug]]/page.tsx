import { page_routes } from "@/app/lib/routes-config";
import { notFound, redirect } from "next/navigation";
import { getCompiledDocsForSlug, getDocFrontmatter, getPreviousNext } from "@/app/lib/markdown-config";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage(props: PageProps) {
  const params = await props.params;
  const { slug = [] } = params;

  const pathName = slug.join("/");
  // If the user visits `/docs/hooks`, redirect to the default hook page
  if (pathName === "hooks") {
    redirect("/docs/hooks/useToggle");
  }

  let res = await getCompiledDocsForSlug(pathName);

  // If slug not found, try redirecting common short paths to their actual location
  if (!res) {
    // try under `hooks/` (e.g., /docs/useToggle -> /docs/hooks/useToggle)
    const altPath = `hooks/${pathName}`;
    const altRes = await getCompiledDocsForSlug(altPath);
    if (altRes) {
      // server-side redirect to canonical path
      redirect(`/docs/${altPath}`);
    }
    // nothing matched - show 404
    notFound();
  }

  const { next } = getPreviousNext(pathName);

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

      {/* Next button */}
      {next && (
        <div className="mt-8 flex justify-end">
          <a
            href={`/docs${next.href}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Next: {next.title}
          </a>
        </div>
      )}
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