import type { MetadataRoute } from "next";

const siteUrl = "https://infinitytattoo.no";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/work",
    "/reviews",
    "/tooth-gems",
    "/freehand-maori-tattoo",
    "/tatovering-lillestrom",
    "/tatovering-strommen",
    "/tatovering-oslo",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
