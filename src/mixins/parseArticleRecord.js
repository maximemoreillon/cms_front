export const parseArticleRecord = {

  computed: {
    article_id(){
      return this.article._fields[this.article._fieldLookup['article']].identity.low
    },
    article_properties(){
      return this.article._fields[this.article._fieldLookup['article']].properties
    }
  },


};
