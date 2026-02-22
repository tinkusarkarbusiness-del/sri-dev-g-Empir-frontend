import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.sridevgempire.com", lastModified: new Date() },
    { url: "https://www.sridevgempire.com/about", lastModified: new Date() },
    { url: "https://www.sridevgempire.com/contact", lastModified: new Date() },
    { url: "https://www.sridevgempire.com/privacy-policy", lastModified: new Date() },
    { url: "https://www.sridevgempire.com/terms", lastModified: new Date() },
  ];
}

