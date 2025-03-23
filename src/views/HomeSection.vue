<template>
  <CardWrapper id="home">
    <h2>Welcome!</h2>
    <div class="home-profile">
      <img src="/image/ses.jpg">
      <p>프론트엔드 개발자 송은선의 포트폴리오입니다.</p>
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
  align-items: center;
  justify-content: space-evenly;

  & img {
    width: 200px;
  }
  & p {
    font-size: 20px;
  }
}
</style>
