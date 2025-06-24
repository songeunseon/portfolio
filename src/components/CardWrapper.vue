<template>
  <section :id="id" :data-index="index" ref="card" class="card" :class="{ visible }">
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  id: String,
  index: Number, // ✅ index props 정의
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

  if (card.value) {
    // ✅ data-index 속성 부여 (옵션)
    card.value.setAttribute('data-index', props.index)
    observer.observe(card.value)
  }
})
</script>

<style lang="scss" scoped>
.card {
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.6s ease;

  &.visible {
    opacity: 1;
  }
  .content {
    width: 50vw;
    height: 60vh;
    position: relative;
    top: 50px;
    transform: translate(-50% -50%);
    background: #1e1e1e;
    color: #e9e9e9;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }
}

@media screen and (max-width: 1024px) {
  .card {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 80vw;
      height: 50vh;
      background: #1e1e1e;
      color: #e9e9e9;
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      transform: scale(1);
      opacity: 0;
      transition: all 0.6s ease;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    &.visible .content {
      transform: scale(1);
      opacity: 1;
    }
  }
}

@media screen and (max-width: 500px) {
  .card {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      width: 80vw;
      height: 70vh;
      background: #1e1e1e;
      color: #e9e9e9;
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      transform: scale(1);
      opacity: 0;
      transition: all 0.6s ease;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    &.visible .content {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
