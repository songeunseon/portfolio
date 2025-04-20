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
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
  updateActiveSection()
})
</script>

<style scoped>
body, * {
  user-select: none;
}
#app {
  display: grid;
  grid-template-columns: 25% 65%;
  height: 100vh;
  overflow: hidden;
  background-color: #afd8df;
}

header {
  grid-column: 1;
  height: 100vh;
  background: #222;
}

.scroll-container {
  grid-column: 2;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

section {
  height: 100vh;
  scroll-snap-align: start;

  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

</style>
