export const formatDate = {

  methods: {
    format_date(date){


      var mm = date.month; // getMonth() is zero-based
      var dd = date.day;

      return [date.year, (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('/');
    }
  },


};
