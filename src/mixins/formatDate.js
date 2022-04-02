export const formatDate = {

  methods: {
    format_date({day,month,year}){
      // Dates are Neo4J formatted
      // i.e. {day, month, year}
      return [
        year,
        month.toString().padStart(2,'0'),
        day.toString().padStart(2,'0'),
      ].join('/');
    }
  },


};
