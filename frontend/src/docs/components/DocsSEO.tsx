import { useLocation } from "react-router";
import { getRouteMetadata } from "@/config/seo";
import SEOMetadata from "@/shared/SEOMetadata";

interface DocsSEOProps {
  title?: string;
  description?: string;
}

export default function DocsSEO({ title, description }: DocsSEOProps) {
  const location = useLocation();
  const defaultMetadata = getRouteMetadata(location.pathname);

  const seoTitle = title
    ? `${title} - Escruta Documentation`
    : defaultMetadata.title;
  const seoDescription = description || defaultMetadata.description;

  return (
    <SEOMetadata
      title={seoTitle}
      description={seoDescription}
      url={`https://escruta.francids.com${location.pathname}`}
      image={defaultMetadata.image}
      twitterCard={defaultMetadata.twitterCard}
    />
  );
}
