<template>

  <div >

    <quill-editor
      v-model="article_data.content"
      ref="myQuillEditor"
      :options="editorOption"/>

  </div>


</template>

<script>



//Quill.register('modules/imageResize', ImageResize);

export default {
  data () {
    return {
      article_data: {
        _id: null,
        title: "",
        summary: "",
        img_src: "",
        content: 'test',
      },

      editorOption: {

      }
    }
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {

    save(){
      console.log({
        date: new Date(),
        cateogies: ['Machine learning', 'IoT', 'Web development'],
        title: this.title,
        summary: this.summary,
        content: this.content,
      })
    }


  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },

}
</script>


<style>






</style>
