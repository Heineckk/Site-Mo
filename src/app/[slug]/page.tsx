import { notFound } from "next/navigation";
import { SiteProvider } from "@/contexts/SiteContext";
import SitePage from "@/components/SitePage";
import { getSiteConfig, getSiteSlugs } from "@/lib/sites";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Gera todas as páginas de presente no build — ex: /ana-livia, /demo */
export function generateStaticParams() {
  return getSiteSlugs().map((slug) => ({ slug }));
}

/**
 * PÁGINA DO PRESENTE PRONTO (/{slug})
 *
 * Cada presente é um site personalizado (história, carta, fotos, quiz).
 * Os dados vêm de arquivos JSON em /sites — ex: sites/ana-livia.json
 * O cliente recebe esse link só depois que você termina e entrega o pedido.
 */
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
