import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
// import About from '@/views/About.vue'
// import Portfolio from '@/views/Portfolio.vue'
// import Skills from '@/views/Skills.vue'
// import Projects from '@/views/Projects.vue'
// import Blog from '@/views/Blog.vue'
// import Contact from '@/views/Contact.vue'

const routes = [
  { path: '/', component: Main },
  // { path: '/about', component: About },
  // { path: '/portfolio', component: Portfolio },
  // { path: '/skills', component: Skills },
  // { path: '/projects', component: Projects },
  // { path: '/blog', component: Blog },
  // { path: '/contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
