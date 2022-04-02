const defaults = {
  title: `Articles - Maxime MOREILLON`,
  description: 'An article management system developed by Maxime MOREILLON',
  image: `${window.location.origin}/logo.png`,
  url: window.location.origin,
}

const metas = [
  {
    article_key: 'title',
    properties: ['twitter:title', 'og:title'],
    default_value: defaults.title,
  },
  {
    article_key: 'summary',
    properties: ['twitter:description', 'og:description'],
    default_value: defaults.description,
  },
  {
    properties: ['twitter:image', 'og:image'],
    default_value: defaults.image,
  },
  {
    properties: ['og:url'],
    default_value: defaults.url,
  },
]




const reset_seo = () => {

  document.title = defaults.title
  document.querySelector(`meta[name="description"]`).content = defaults.description


  metas.forEach( ({properties, default_value}) => {

    properties.forEach( (meta) => {
      const tag = document.querySelector(`meta[property="${meta}"]`)
      tag.content = default_value
    })
  })

}

const set_article_seo = (article) => {
  document.title = article.title

  // Summary?
  document.querySelector(`meta[name="description"]`).content = article.summary


  metas.forEach( ({properties, article_key}) => {

    properties.forEach( (meta) => {
      const tag = document.querySelector(`meta[property="${meta}"]`)
      const value = article[article_key]
      if(value) tag.content = value
    })

  })
}


export {
  reset_seo,
  set_article_seo
}
