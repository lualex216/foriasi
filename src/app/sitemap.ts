import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://foriasi.ro";
  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/termeni-si-conditii`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-confidentialitate`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-cookies`,
      lastModified: new Date("2026-07-23"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
