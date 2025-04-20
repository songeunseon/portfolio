<template>
  <header
    class="header"
    :class="{ expanded: isExpanded }"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <div class="logo">
      <img src="/main/logo.png" alt="Logo" />
    </div>

    <div class="toggle-icon">
      {{ isExpanded ? '◀' : '▶' }}
    </div>

    <nav>
      <ul class="menu">
        <li :class="{ active: activeSection === 'home' }">
          <a href="#home">Home</a>
        </li>
        <li :class="{ active: activeSection === 'about' }">
          <a href="#about">About</a>
        </li>
        <li :class="{ active: activeSection === 'projects' }">
          <a href="#projects">Projects</a>
        </li>
        <li :class="{ active: activeSection === 'contact' }">
          <a href="#contact">Contact</a>
        </li>
        <li :class="{ active: activeSection === 'community' }">
          <a href="#community">Community</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

const activeSection = ref('home')
const isExpanded = ref(false)

onMounted(async () => {
  await nextTick()

  history.replaceState(null, '', window.location.pathname)
  window.scrollTo({ top: 0, behavior: 'auto' })

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
  width: 60px;
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
  transition: width 0.5s ease;
  position: relative;

  &.expanded {
    width: 220px;
  }
}

.logo {
  width: 100%;
  margin-bottom: 40px;

  img {
    width: 100%;
  }
}

.toggle-icon {
  color: #ccc;
  font-size: 13px;
  margin-bottom: 20px;
  user-select: none;
  pointer-events: none;
  position: absolute;
  right: -20px;
  background-color: #222 !important;
  width: 20px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 10px 10px 0;
}

nav {
  width: 100%;
}

.menu {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
  transition: opacity 0.3s ease;

  li {
    height: 40px;
    width: 100%;
    text-align: center;

    a {
      font-size: 16px;
      color: #ccc;
      text-decoration: none;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        color: #fff;
      }
    }

    &.active a {
      color: #b0d8df;
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.header.expanded .menu a {
  opacity: 1;
}
</style>
