import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Article from '../views/Article.vue'
import ArticleList from '../views/ArticleList.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/articles',
    alias: '/',
    name: 'article_list',
    component: ArticleList,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },

  {
    path: '/articles/:article_id',
    name: 'article',
    component: Article,
  },

  {
    path: '/articles/:article_id/edit',
    alias: '/article_editor',
    name: 'article_editor',
    component: () => import('@/views/ArticleEditor.vue'),
  },

  {
    path: '/tags/',
    name: 'tags',
    component: () => import('@/views/TagList.vue'),
  },

  // Legacy
  {
    path: '/article', redirect: to => {
      return {
        name: 'article',
        params: {
          article_id: to.query.id
        },
        query: {}
      }
    }
  },

  { path: '/*', redirect: { name: 'article_list' }}


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
