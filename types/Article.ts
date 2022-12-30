import Neo4jDate from './Neo4jDate'
import Author from './Author'
import Tag from './Tag'

type Article = {
    _id: string,

    title: string,
    content: string,
    summary: string,
    thumbnail_src: string,
    views: number,

    published: boolean,

    tags: Tag[],

    author: Author,

    authorship: {
        creation_date: Neo4jDate,
        edition_date: Neo4jDate,
    }


}

export default Article