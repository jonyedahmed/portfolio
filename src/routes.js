// Site-wide settings and the list of pages.
// Every page here is pre-rendered at build time with its own title and description.

export const SITE = "https://www.jonayed.online";

// Profile photo shown in the header. To use your own photo:
// 1) put the file in the "public" folder (for example public/profile.jpg)
// 2) change this line to "/profile.jpg"
export const PHOTO = "/profile.jpg";

export const ROUTES = [
  {
    path: "/",
    title: "Jonayed Ahmed | SEO Expert & Digital Marketer in Dhaka",
    description:
      "Jonayed Ahmed is an SEO Expert and Digital Marketer in Dhaka, Bangladesh. Technical SEO audits, on-page optimization, e-commerce content and reporting.",
    priority: "1.0",
  },
  {
    path: "/about",
    title: "About | Jonayed Ahmed, SEO Expert in Dhaka",
    description:
      "Learn how Jonayed Ahmed approaches SEO: search intent research, technical and on-page optimization, and clear measurement for e-commerce websites.",
    priority: "0.8",
  },
  {
    path: "/work",
    title: "Selected SEO Work | Jonayed Ahmed",
    description:
      "Selected SEO projects by Jonayed Ahmed: e-commerce category pages, competitor analysis, technical audits, ranking reports and product upload tracking.",
    priority: "0.9",
  },
  {
    path: "/experience",
    title: "SEO Experience | Jonayed Ahmed",
    description:
      "SEO experience of Jonayed Ahmed at Creatus Computer, Againsoft and SIHA Marketing Agency, covering e-commerce content, audits and reporting.",
    priority: "0.8",
  },
  {
    path: "/expertise",
    title: "SEO Skills & Certifications | Jonayed Ahmed",
    description:
      "SEO skills, tools and certifications of Jonayed Ahmed: Google Analytics, Google Ads, Semrush, Ahrefs, Search Console and OpenCart.",
    priority: "0.7",
  },
  {
    path: "/contact",
    title: "Contact | Jonayed Ahmed, SEO Expert",
    description:
      "Contact Jonayed Ahmed, an SEO Expert in Dhaka, for technical SEO, e-commerce content or reporting help.",
    priority: "0.7",
  },
];

export const NOT_FOUND = {
  path: "/404",
  title: "Page not found | Jonayed Ahmed",
  description: "The page you are looking for does not exist.",
};
