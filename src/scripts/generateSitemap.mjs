import { writeFileSync } from "fs";
import prettier from "prettier";
import { siteMetadata } from "../data/siteMetaData.mjs";

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig("./prettier.config.js");

  const baseUrl = siteMetadata.siteUrl;
  const pages = ["", "about", "projects"];
  const locales = ["en", "ar"];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${pages
        .map((page) => {
          return locales
            .map((locale) => {
              const isDefault = locale === "en";
              const path = page === "" ? "" : `/${page}`;
              const localePath = isDefault ? path : `/ar${path}`;
              const loc = `${baseUrl}${localePath}`;

              return `
        <url>
          <loc>${loc}</loc>
          <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${path}" />
          <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar${path}" />
          <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${path}" />
        </url>`;
            })
            .join("");
        })
        .join("")}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${baseUrl}/sitemap.xml`;

  writeFileSync("public/robots.txt", robotsTxt);

  console.log(
    "Successfully generated\n-> Sitemap at public/sitemap.xml\n-> Robots.txt at public/robots.txt",
  );
}

generateSitemap();
