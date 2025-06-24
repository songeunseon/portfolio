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
<!--
  <div class="toggle-icon">
    {{ isExpanded ? '▲' : '▼' }}
  </div>
-->

    <nav>
      <ul class="menu">
        <li v-for="item in menuItems" :key="item.id" :class="{ active: activeSection === item.id }">
          <button @click="scrollToSection(item.id)">
            {{ item.label }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  activeSection: String,
})

const isExpanded = ref(false)

const menuItems = [
  { id: 'profile', label: 'Profile' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
  { id: 'community', label: 'Community' },
]

const scrollToSection = (id) => {
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

</script>

<style scoped lang="scss">
.header {
  width: 100vw;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  background: #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  transition: width 0.5s ease;
  padding: 0 50px;

}

.logo {
  height: 100px;

  img {
    height: 100%;
  }
}

.toggle-icon {
  color: #ccc;
  font-size: 13px;
  margin-bottom: 20px;
  user-select: none;
  pointer-events: none;
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translate(-50% -50%);
  background-color: #222;
  width: 50px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
}

nav {
  width: 80%;
}

.menu {
  list-style: none;
  padding-right: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2vw;

  li {
    text-align: center;

    button {
      background: none;
      border: none;
      font-size: 1.2vw;
      color: #ccc;
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }

    &.active button {
      color: #b0d8df;
      font-size: 2vw;
      font-weight: bold;
    }
  }
}
</style>
