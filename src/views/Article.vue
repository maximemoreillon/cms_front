<template>
  <div class="container" >

    <div
      v-if="article_data"
      ref="article_content"
      class="article_content"
      v-html="this.article_data.content">

    </div>

  </div>


</template>

<script>


  export default {
    data () {
      return {
        article_data: null,
        modal_image_src: "",
      }
    },

    mounted() {
      this.get_content();
    },
    methods: {
      get_content(){
        this.article_data = {
          content: "<h1>Hello world</h1><p>This is great!</p><img src='https://cdn.maximemoreillon.com/logo/thick/logo.png'>"
        },
        this.$nextTick(() => {
          this.add_event_listeners_for_image_modals();
        })
      },
      add_event_listeners_for_image_modals(){
        this.$refs.article_content.querySelectorAll('img').forEach(img => {
          img.addEventListener("click", event => {
            console.log("alright")
            this.modal_image_src = event.target.src
          }, false)
        })
      },
    }

  }
</script>


<style>


.article_content h2{
  color: #c00000;
}

.article_content img {
  /* test CSS for images */
  outline: 1px solid red;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100px;
}



</style>
