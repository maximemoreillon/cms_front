// const { CANONICAL_URL } = process.env
const CANONICAL_URL = "https://articles.maximemoreillon.com"
const title = "Articles | Maxime Moreillon"
const description = "An article management system developed by Maxime Moreillon"
const logoRelPath = "/images/logo.png"
const imageUrl = `${CANONICAL_URL}${logoRelPath}`
export default {
  title,
  link: [
    { rel: "icon", type: "image/png", href: logoRelPath }, // TODO: make favicon user customizable
  ],
  meta: [
    { name: "description", content: description },

    // OpenGraph
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:image", content: imageUrl },
    { name: "og:url", content: CANONICAL_URL },
    { name: "og:type", content: "website" },
    { name: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@m_moreillon" }, // TODO: make twitter username user customizable
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "CMS logo" },
  ],
}
