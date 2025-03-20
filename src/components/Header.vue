<template>
  <header class="header">
    <div class="logo">
      <img src="/main/logo.png" />
    </div>
    <nav>
      <ul class="menu">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { menuItems } from '@/utils/item'
</script>

<style lang="scss" scoped>
$primary-color: #333;
$hover-color: #b0d8df;
$transition-speed: 0.3s;

.header {
  width: 200px;
  height: 100vh;
  background-color: #333;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
}
.logo {
  width: 100%;
  & img {
    width: 100%;
  }
}
.menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  list-style: none;
  padding: 0;
  li {
    position: relative;
    font-size: 18px;
    width: 80%;
    text-align: center;
    a {
      display: block;
      width: 100%;
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      border-radius: 5px;
      padding: 10px 0;
      transition:
        background-color $transition-speed,
        color $transition-speed;

      &:hover {
        width: 100%;
        background-color: $hover-color;
        color: $primary-color;
      }
    }
  }
}
</style>
