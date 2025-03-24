<template>
  <section :id="id" ref="card" class="card" :class="{ visible }">
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  id: String,
})

const visible = ref(false)
const card = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible.value = entry.isIntersecting
    },
    { threshold: 0.4 },
  )

  observer.observe(card.value)
})
</script>

<style scoped lang="scss">
.card {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    width: 50vw;
    height: 50vh;
    background: #1e1e1e;
    color: #e9e9e9;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    transition: all 0.6s ease;
    transform: scale(0.3);
    opacity: 0.5;
    text-align: center;
    display: flex;
    align-items: center;
  }

  &.visible .content {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
