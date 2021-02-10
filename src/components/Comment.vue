<template>
  <div class="comment">
    <div class="comment_header">
      <div class="">
        <span class="author">
          {{comment.properties.author}}
        </span>
        <span class="date">({{format_date(comment.properties.date)}})</span>
      </div>

      <IconButton
        v-if="deletable"
        v-on:buttonClicked="delete_comment()">
        <delete-icon/>
      </IconButton>
    </div>

    <div class="content">
      {{comment.properties.content}}
    </div>

  </div>

</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import {formatDate} from '@/mixins/formatDate.js'


export default {
  name: 'Comment',
  components: {
    IconButton,
    DeleteIcon,
  },
  mixins: [
    formatDate,
  ],
  props: {
    comment: {
      type: Object
    },
    deletable: {
      type: Boolean,
      default(){return false}
    }

  },
  methods: {
    delete_comment(){
      if(confirm('Delete comment?')){
        const url = `${process.env.VUE_APP_CMS_API_URL}/comments/${this.comment.identity}`
        this.axios.delete(url)
        .then( () => {
          this.$emit('deleted')
        })
        .catch(error => alert(error.response.data))
      }
    },
  },

}
</script>

<style scoped>
.comment {
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #dddddd;
}

.comment_header {
  display: flex;
  justify-content: space-between;
}

.content {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
}

.date {
  font-size: 80%;
  color: #444444;
}
.author {
  font-weight: bold;
}



</style>
