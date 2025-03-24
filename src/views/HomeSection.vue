<template>
  <CardWrapper id="home">
    <div class="home-profile">
      <img src="/image/ses.jpg" />
      <p>프론트엔드 개발자 송은선입니다</p>
    </div>
    <!-- <div>
      <p>자기소개서 ▼</p>
    </div> -->
  </CardWrapper>
</template>

<script setup>
import CardWrapper from '@/components/CardWrapper.vue'
</script>

<style lang="scss" scoped>
.home-profile {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;

  & img {
    width: 200px;
    border-radius: 10px;
  }
  & p {
    font-size: 20px;
    padding: 20px;
  }
}
</style>
