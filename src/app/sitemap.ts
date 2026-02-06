import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sridevgempire.com", lastModified: new Date() },
    { url: "https://sridevgempire.com/about", lastModified: new Date() },
    { url: "https://sridevgempire.com/contact", lastModified: new Date() },
    { url: "https://sridevgempire.com/privacy-policy", lastModified: new Date() },
    { url: "https://sridevgempire.com/terms", lastModified: new Date() },
    { url: "https://sridevgempire.com/dashboard", lastModified: new Date() },
  ];
}

