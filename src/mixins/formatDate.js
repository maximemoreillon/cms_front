export const formatDate = {

  methods: {
    format_date(date){


      var mm = date.month.low; // getMonth() is zero-based
      var dd = date.day.low;

      return [date.year.low, (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('/');
    }
  },


};
