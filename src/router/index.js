import { createRouter, createWebHistory } from 'vue-router'
import HomeSection from '@/views/HomeSection.vue'
import AboutSection from '@/views/AboutSection.vue'
import ProjectsSection from '@/views/ProjectsSection.vue'
import ContactSection from '@/views/ContactSection.vue'
import CommunitySection from '@/views/CommunitySection.vue'

const routes = [
  { path: '/', component: HomeSection },
  { path: '/about', component: AboutSection },
  { path: '/project', component: ProjectsSection },
  { path: '/contact', component: ContactSection },
  { path: '/community', component: CommunitySection },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
