import Neo4jDate from "./types/Neo4jDate"

export const formatNeo4jDate = (neo4JDate: Neo4jDate) => {
    const {day, month, year} = neo4JDate
    // TODO: Format using toLocaleString
    const date = new Date(`${year}-${month}-${day}`)
    return date.toLocaleDateString()
}

