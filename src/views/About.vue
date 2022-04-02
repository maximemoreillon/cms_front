<template>
  <div class="about" >
    <h1>About</h1>
    <p>A simple article management web application built using Node.js, Vue.js, Express and Neo4J</p>
    <p>Author:
      <a href="https://maximemoreillon/com">Maxime MOREILLON</a>
    </p>
    <h2>Services</h2>

    <div class="table_wrapper">
      <table>
        <tr>
          <th>Service</th>
          <th>Version</th>
          <th>URL</th>
        </tr>
        <tr
          v-for="(service, index) in services"
          :key="`service_${index}`">
          <td>{{service.name}}</td>
          <td>{{service.version}}</td>
          <td>{{service.url}}</td>

        </tr>
      </table>
    </div>





  </div>
</template>

<script>

import pjson from '../../package.json'



export default {
  components: {

  },

  data () {
    return {
      services: [
        {
          name: 'GUI',
          url: window.location.origin,
          version: pjson.version
        },
        {
          name: 'API',
          url: process.env.VUE_APP_CMS_API_URL,
          version: null
        },
        {
          name: 'User management API',
          url: process.env.VUE_APP_USER_MANAGER_API_URL,
          version: null
        },
        {
          name: 'Image manager API',
          url: process.env.VUE_APP_IMAGE_MANAGER_API_URL,
          version: null
        },
      ],
    }
  },
  mounted(){
    this.get_services_info()
  },
  methods: {
    get_services_info () {
      this.services.forEach((service) => {
        if (service.version) return
        service.version = 'Connecting...'
        this.axios.get(service.url)
          .then(({ data }) => { service.version = data.version })
          .catch(() => { service.version = 'Unable to connect' })
      })
    }

  }



}
</script>


<style scoped>


.table_wrapper {
  width: 100%;
  overflow-x: auto;
}


table {
  width: 100%;
  border-collapse: collapse;
}

tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}

th, td {
  white-space: nowrap;
  padding: 0.25em 1em;
}
th {
  text-align: left;
}



</style>
