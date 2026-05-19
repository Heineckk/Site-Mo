import { notFound } from "next/navigation";
import { SiteProvider } from "@/contexts/SiteContext";
import SitePage from "@/components/SitePage";
import { getSiteConfig, getSiteSlugs } from "@/lib/sites";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSiteSlugs().map((slug) => ({ slug }));
}

export default async function SiteSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const site = getSiteConfig(slug);

  if (!site) {
    notFound();
  }

  return (
    <SiteProvider site={site}>
      <SitePage />
    </SiteProvider>
  );
}
