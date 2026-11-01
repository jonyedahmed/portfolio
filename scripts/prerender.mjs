// Builds one static HTML file per page so crawlers see real content and per-page SEO tags.
// Also writes sitemap.xml from the route list.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, ".ssr");

const entry = fs.readdirSync(ssrDir).find((f) => f.startsWith("entry-server") && f.endsWith(".js"));
if (!entry) throw new Error("SSR bundle not found in .ssr");

const { render, ROUTES, NOT_FOUND, SITE } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("Placeholder <!--app-html--> missing from dist/index.html");
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Replaces the value of a tag attribute, e.g. content="..." inside a given meta tag.
const setAttr = (html, tagPattern, attr, value) =>
  html.replace(new RegExp(`(${tagPattern}[^>]*?${attr}=")[^"]*(")`), (_, a, b) => a + value + b);

function buildPage({ path: routePath, title, description }, { noindex = false } = {}) {
  const url = SITE + (routePath === "/" ? "/" : routePath);
  const t = esc(title);
  const d = esc(description);

  let html = template.replace("<!--app-html-->", () => render(routePath));
  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${t}</title>`);
  html = setAttr(html, '<meta name="description"', "content", d);
  html = setAttr(html, '<link rel="canonical"', "href", url);
  html = setAttr(html, '<meta property="og:url"', "content", url);
  html = setAttr(html, '<meta property="og:title"', "content", t);
  html = setAttr(html, '<meta property="og:description"', "content", d);
  html = setAttr(html, '<meta name="twitter:title"', "content", t);
  html = setAttr(html, '<meta name="twitter:description"', "content", d);

  // The Person/ProfilePage schema belongs to the homepage only.
  if (routePath !== "/") {
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, "");
  }
  if (noindex) {
    html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, follow" />');
  }
  return html;
}

for (const route of ROUTES) {
  const outDir = route.path === "/" ? dist : path.join(dist, route.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), buildPage(route));
}

// Cloudflare Pages serves a top-level 404.html for unknown addresses.
fs.writeFileSync(path.join(dist, "404.html"), buildPage(NOT_FOUND, { noindex: true }));

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map(
  (r) =>
    `  <url>\n    <loc>${SITE}${r.path === "/" ? "/" : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`
).join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${ROUTES.length} pages + 404.html + sitemap.xml`);
