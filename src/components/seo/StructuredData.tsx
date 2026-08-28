import { appConfig } from "@/packages/configs/app.config";

const { site, app } = appConfig;

/**
 * Rendered once in the root layout. Using SoftwareApplication (rather than
 * WebSite) lets Google show a "free" price badge and app-category context
 * in rich results, which fits a free browser-based tool better than a
 * generic website schema.
 */
const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    url: site.url,
    description: site.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web Browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "LifeInvader car ad generator",
      "LifeInvader house ad generator",
      "LifeInvader clothing ad generator",
      "LifeInvader item ad generator",
      "LifeInvader business ad generator",
    ],
    keywords: appConfig.keywords.slice(0, 12).join(", "),
    image: site.ogImageUrl ?? site.logoUrl,
    publisher: {
      "@type": "Organization",
      name: site.author.name,
      url: site.author.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static, server-generated JSON-LD with no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default StructuredData;
