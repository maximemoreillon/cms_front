const { CANONICAL_URL } = process.env

const title = "Articles | Maxime Moreillon"
const description = "An article management system developed by Maxime Moreillon"

export default {
  title,
  link: [
    { rel: "icon", type: "image/png", href: "/images/logo.png" }, // TODO: make favicon user customizable
  ],
  meta: [
    { name: "description", content: description },

    // OpenGraph
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:image", content: `${CANONICAL_URL}/logo.png` },
    { name: "og:url", content: CANONICAL_URL },
    { name: "og:type", content: "article" },
    { name: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@m_moreillon" }, // TODO: make twitter username user customizable
    { name: "twitter:title", content: "Articles | Maxime Moreillon" },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: `${CANONICAL_URL}/logo.png`,
    },
    { name: "twitter:image:alt", content: "CMS logo" },
  ],
}
