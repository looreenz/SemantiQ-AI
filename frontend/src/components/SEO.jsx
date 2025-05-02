import { Helmet } from "react-helmet";

// SEO component: adds dynamic <head> metadata for each page
function SEO({
  title,
  description = "Plataforma de análisis inteligente de documentos con IA.",
  keywords = "inteligencia artificial, análisis de documentos, semantiq ai, IA documentos, RAG",
  endpoint = "",
  image = "/logoPrimary.svg",
  noIndex = false,
}) {
  // Full page title and canonical URL
  const fullTitle = `SemantiQ AI · ${title}`;
  const fullUrl = `https://semantiqai.daw.iesevalorpego.es/${endpoint}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="SemantiQ AI" />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph for Facebook and social sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter Card metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}

export default SEO;
