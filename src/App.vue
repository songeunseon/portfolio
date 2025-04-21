<template>
  <div id="app">
    <Header :activeSection="activeSection" />
    <HomeSection />
    <AboutSection />
    <ProjectsSection />
    <ContactSection />
    <CommunitySection />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Header from '@/components/Header.vue'
import HomeSection from '@/views/HomeSection.vue'
import AboutSection from '@/views/AboutSection.vue'
import ProjectsSection from '@/views/ProjectsSection.vue'
import ContactSection from '@/views/ContactSection.vue'
import CommunitySection from '@/views/CommunitySection.vue'

const activeSection = ref('home')

onMounted(async () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  await nextTick()

  const firstSection = document.querySelector('section.card[data-index="0"]')
  if (firstSection) {
    setTimeout(() => {
      window.scrollTo({
        top: firstSection.offsetTop,
        behavior: 'auto',
      })
      activeSection.value = firstSection.id || 'home'
    }, 100)
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) {
        activeSection.value = visible.target.id
      }
    },
    { threshold: 0.6 },
  )

  const sections = document.querySelectorAll('section.card')
  sections.forEach((section) => observer.observe(section))
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 스크롤 주체는 #app */
  user-select: none;
}

#app {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background-color: #b0d8df;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

#app::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* 각 섹션 기본 스타일 */
section.card {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
