// Using these functions because ID have changed multiple times over the course of time
export default {
    methods: {
        format_neo4j_date({ day, month, year }, separator = '/') {
            // Neo4J date format: {day, month, year}
            return [
                year,
                month.toString().padStart(2, '0'),
                day.toString().padStart(2, '0'),
            ].join(separator);
        }
    },
    computed: {

    }
}
