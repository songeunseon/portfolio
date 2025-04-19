<template>
  <div id="app">
    <Header :activeSection="activeSection" />
    <div class="scroll-container" ref="container" @scroll="onScroll">
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <CommunitySection />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import HomeSection from '@/views/HomeSection.vue'
import AboutSection from '@/views/AboutSection.vue'
import ProjectsSection from '@/views/ProjectsSection.vue'
import ContactSection from '@/views/ContactSection.vue'
import CommunitySection from '@/views/CommunitySection.vue'

const activeSection = ref('home')
const container = ref(null)

const updateActiveSection = () => {
  const sections = container.value.querySelectorAll('section')
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
      activeSection.value = section.id
    }
  })
}

const onScroll = () => {
  window.requestAnimationFrame(updateActiveSection)
}

onMounted(() => {
  updateActiveSection()
})
</script>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  margin-left: 10vw;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
}

section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-margin-top: 60px;
  background-color: #b0d8df;
}
</style>
