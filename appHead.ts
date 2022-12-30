const { CANONICAL_URL } = process.env

const description = "An article management system developed by Maxime Moreillon"

export default {
  title: "Articles | Maxime Moreillon",
  //   TODO: make favicon user customizable
  link: [{ rel: "icon", type: "image/png", href: "/images/logo.png" }],
  meta: [
    { name: "description", content: "Articles | Maxime Moreillon" },

    // Twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@m_moreillon" },
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

    // OpenGraph
    {
      name: "og:title",
      content: description,
    },
    { name: "og:description", content: "Articles | Maxime Moreillon" },
    //TODO: use logo in public
    {
      name: "og:image",
      content: `${CANONICAL_URL}/logo.png`,
    },
    { name: "og:url", content: CANONICAL_URL },
    { name: "og:type", content: "article" },
    { name: "og:locale", content: "en_US" },
  ],
}
