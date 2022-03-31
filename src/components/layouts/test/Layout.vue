<template>
  <div class="app">

    <header>
      <span>My CMS</span>
      <button @click="nav =! nav">NAV</button>
    </header>

    <nav :class="{open: nav}">
      <a href="#">Link</a>
      <a href="#">Link</a>
      <a href="#">Link</a>
    </nav>



    <main>
      <article>
        <h1>My Article</h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut risus gravida, vestibulum orci sed, porta dolor. Donec ultricies elit id odio tincidunt tempus. Curabitur tempus nulla et massa dapibus fringilla. Proin ut risus odio. Phasellus pulvinar, mi sed condimentum dictum, risus nibh euismod augue, ut aliquet lorem libero non orci. Phasellus commodo nisi quis magna malesuada porttitor. Nam ut ipsum erat. Aliquam in consectetur mi, vel tempus nibh. Morbi rutrum mi neque, nec malesuada tortor gravida at. Vestibulum nulla leo, pellentesque eu faucibus eu, tristique a odio. Quisque venenatis, massa non egestas ultrices, nunc est malesuada urna, eget varius dui nibh vitae tellus. Proin ac tellus eget dolor bibendum cursus. Mauris et est tristique, laoreet leo a, elementum quam. Nunc laoreet, nisl non imperdiet feugiat, nunc urna commodo dui, quis varius est mauris non ipsum. Ut ullamcorper efficitur tortor, at tincidunt massa aliquet eu.
        <h2>Sub header</h2>
        Praesent at quam efficitur, fringilla odio a, vehicula leo. Proin mauris mi, posuere vel ligula at, pharetra egestas ipsum. Nulla sit amet consequat erat. Donec dignissim nisl non tortor ultricies elementum. Mauris posuere mi id est euismod faucibus. Nunc et libero quis mauris ultrices mattis. Etiam at augue orci. Nam ac vehicula sem, sed vulputate turpis. Sed in ultrices lorem. Vestibulum gravida aliquam volutpat. Nunc ipsum ex, lobortis ac consectetur vitae, lobortis nec mi. Integer non orci massa. Duis ultricies ultricies leo quis vehicula. Sed sodales erat non facilisis accumsan. Maecenas luctus orci vel dolor molestie, at tempus arcu euismod. Nullam nisl massa, aliquet id accumsan imperdiet, mollis sed augue.
        Quisque placerat augue at ipsum ornare tempus. Praesent eu erat gravida, bibendum massa fermentum, egestas turpis. Integer hendrerit id enim ut sodales. Praesent suscipit orci vitae quam pulvinar tincidunt. Duis suscipit odio at magna feugiat dictum. Nullam ipsum dolor, luctus vitae laoreet non, iaculis at lectus. Ut a eleifend orci. Cras tempus, elit eget egestas lacinia, est quam laoreet lorem, eget viverra orci est eleifend nisi. Sed at quam ac ipsum feugiat bibendum.
        Quisque ac iaculis urna, eget egestas odio. Nulla a tempor lectus, vel volutpat odio. Sed fermentum consectetur cursus. Nam et nunc scelerisque, dignissim metus sed, volutpat est. Cras vel volutpat orci. Nunc id leo velit. Quisque luctus, sapien ac facilisis pellentesque, ex nisi tincidunt tellus, id sagittis dolor tortor in enim. Sed magna dui, hendrerit eget faucibus vel, ultrices non elit. Curabitur ac interdum lacus. Morbi condimentum quam turpis, nec maximus justo interdum sed. Proin eu justo lorem. Nam dictum sapien metus. Fusce ac mi in metus aliquam tempus ut at lacus.
        Nulla rutrum ligula lorem, eget imperdiet ligula tincidunt vitae. Curabitur iaculis magna nec gravida scelerisque. Curabitur tellus justo, faucibus sit amet bibendum a, interdum ut purus. Duis quis mi volutpat, auctor dui in, vestibulum elit. Sed ultricies, leo vel consectetur porttitor, nisi urna feugiat ex, et congue enim nulla nec augue. Vivamus quis felis neque. Duis a orci molestie, congue risus a, malesuada diam. Nulla maximus, risus a lacinia feugiat, augue magna fringilla arcu, eget aliquet nunc magna sed ex. Curabitur imperdiet lectus purus, eget lacinia lorem ullamcorper sed. Donec turpis magna, volutpat lobortis molestie ac, ultricies in orci.
      </article>
    </main>

    <footer>
      My CMS - Maxime Moreillon - 2022
    </footer>

  </div>
</template>

<script>




import '@/styles/test/main.css'

export default {
  name: 'Layout',
  components: {

  },
  data(){
    return {
      nav: false,
    }
  }

}
</script>

<style>
/* Styles imported from external file */

</style>
