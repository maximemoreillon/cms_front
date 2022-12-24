type Neo4jDate = {
    day: number,
    month: number,
    year: number,
}
export const formatNeo4jDate = (neo4JDate: Neo4jDate) => {
    const {day, month, year} = neo4JDate
    // TODO: Format using toLocaleString
    const date = new Date(`${year}-${month}-${day}`)
    return date.toLocaleDateString()
}

