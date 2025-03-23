<template>
  <header class="header">
    <div class="logo">
      <img src="/main/logo.png" />
    </div>
    <nav>
      <ul class="menu">
        <li :class="{ active: activeSection === 'home' }"><a href="#home">Home</a></li>
        <li :class="{ active: activeSection === 'about' }"><a href="#about">About</a></li>
        <li :class="{ active: activeSection === 'projects' }"><a href="#projects">Projects</a></li>
        <li :class="{ active: activeSection === 'contact' }"><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const activeSection = ref('home')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.5 }
  )

  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section)
  })
})
</script>

<style scoped lang="scss">
.header {
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  z-index: 10;
}
.logo {
  width: 100%;
  margin-bottom: 40px;

  img {
    width: 100%;
  }
}
.menu {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    a {
      color: #ccc;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: #fff;
      }
    }

    &.active a {
      color: #b0d8df;
    }
  }
}
</style>
