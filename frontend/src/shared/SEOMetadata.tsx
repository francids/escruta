interface SEOMetadataProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  keywords?: string;
  author?: string;
  twitterCard?: string;
  siteName?: string;
  locale?: string;
}

const baseUrl = "https://escruta.com";
const defaultImage = `${baseUrl}/OpenGraphImage.webp`;
const defaultAuthor = "Francisco Mesa";
const defaultSiteName = "Escruta";

export default function SEOMetadata({
  title,
  description,
  url = baseUrl,
  image = defaultImage,
  type = "website",
  keywords,
  author = defaultAuthor,
  twitterCard = "summary_large_image",
  siteName = defaultSiteName,
  locale = "en_US",
}: SEOMetadataProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content={type} />
      <meta name="og:url" content={url} />
      <meta name="og:site_name" content={siteName} />
      <meta name="og:locale" content={locale} />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="600" />
      <meta
        name="og:image:alt"
        content="Escruta - AI-powered knowledge management platform"
      />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Escruta - AI-powered knowledge management platform"
      />
      <meta name="twitter:creator" content="@franc_ids" />
      <meta name="twitter:site" content="@franc_ids" />
    </>
  );
}
