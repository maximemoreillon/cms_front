<template>

  <!-- Or manually control the data synchronization（或手动控制数据流） -->
  <div class="container">

    <div class="input_area">
      <input type="text" v-model="title" placeholder="title">
      <textarea v-model="summary"/>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"/>
    </div>



    <div class="preview_container">
      <div v-if="true" class="preview_html">{{content}}</div>
      <div v-if="true" class="preview" ref="preview" v-html="content"/>
      <div class="">
        <button type="button" v-on:click="save()">SAVE</button>
        <img v-bind:src="img_src" alt="alet">
      </div>
    </div>




  </div>


</template>

<script>


  export default {
    data () {
      return {
        title: "",
        summary: "",
        img_src: "",

        content: '<img src="https://www.vuetoolbox.com/packs/_/assets/images/logo-05a09b638482b4dff91056a3fe77590b.png"><img src="https://www.vuetoolbox.com/packs/_/assets/images/logo-05a09b638482b4dff91056a3fe77590b.png">',
        editorOption: {
          // some quill options
        }
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      /*
      onEditorBlur(quill) {
        //console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        //console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        //console.log('editor ready!', quill)
      },
      */
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
    mounted() {
      //console.log('this is current quill instance object', this.editor)
      console.log()
      this.$refs.preview.querySelectorAll('img')[1].addEventListener("click", event => {
        console.log(event.target.src)
        this.img_src = event.target.src
      }, false)

    }
  }
</script>


<style>

.container {
  display: flex;
}

.container > *{
  flex-grow: 1;
  flex-basis: 0;
  flex-shrink: 1;
}


.preview h2{
  color: #c00000;
}

.preview img {
  max-width: 200px;
}



</style>
