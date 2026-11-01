// Injects the server-rendered HTML into dist/index.html so crawlers see real content.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, ".ssr");

const entry = fs.readdirSync(ssrDir).find((f) => f.startsWith("entry-server") && f.endsWith(".js"));
if (!entry) throw new Error("SSR bundle not found in .ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href);
const appHtml = render();

const template = fs.readFileSync(htmlPath, "utf-8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("Placeholder <!--app-html--> missing from dist/index.html");
}
fs.writeFileSync(htmlPath, template.replace("<!--app-html-->", appHtml));
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log("Pre-rendered dist/index.html (" + appHtml.length + " chars of HTML)");
