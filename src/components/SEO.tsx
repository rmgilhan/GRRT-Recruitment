import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string; // Add an optional image prop
}

const SEO = ({ title, description, keywords, image }: SEOProps) => {
  const location = useLocation();
  const siteUrl = "https://grrt-recruitment.vercel.app";
  const defaultImage = `${siteUrl}/social-preview.jpg`; // Create this image later!

  useEffect(() => {
    document.title = `${title} | GRRT Recruitment Services`;

    // Helper function to update/create meta tags
    const setMetaTag = (attr: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords || "recruitment, jobs, hiring");

    // Open Graph / Facebook / LinkedIn
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", `${siteUrl}${location.pathname}`);
    setMetaTag("property", "og:title", `${title} | GRRT Recruitment`);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", image || defaultImage);

    // Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image || defaultImage);

  }, [title, description, keywords, location, image]);

  return null;
};

export default SEO;