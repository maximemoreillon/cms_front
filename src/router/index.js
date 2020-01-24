import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import About from '../views/About.vue'
import Article from '../views/Article.vue'
import ArticleEditor from '../views/ArticleEditor.vue'
import ArticleList from '../views/ArticleList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'article_list',
    component: ArticleList,
  },
  /*
  {
    path: '/about',
    name: 'about',
    component: About
  },

  {
    path: '/article_list',
    name: 'article_list',
    component: ArticleList
  },
  */
  {
    path: '/article',
    name: 'article',
    component: Article,
    props: true,
  },
  {
    path: '/article_editor',
    name: 'article_editor',
    component: ArticleEditor,
    props: true,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
