import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/sites";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteConfig(slug);

  if (!site) {
    return { title: "Presente não encontrado" };
  }

  return {
    title: site.meta.title,
    description: site.meta.description,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      title: site.meta.title,
      description: site.meta.description,
      type: "website",
    },
  };
}

export default async function SiteLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const site = getSiteConfig(slug);

  if (!site) {
    notFound();
  }

  return children;
}
