<template>
  <CardWrapper id="home">
    <p class="title">Profile</p>
    <div class="home-profile">
      <img src="/image/ses.jpg" />
      <div class="profile-text">
        <p @click="toggleInfo('name')" :class="{ 'pulse-animate': !showInfo.name }">
          {{ showInfo.name ? '송은선' : '이름' }}
        </p>

        <p @click="toggleInfo('birth')" :class="{ 'pulse-animate': !showInfo.birth }">
          {{ showInfo.birth ? '1992.05.25' : '생년월일' }}
        </p>

        <p @click="toggleInfo('exp')" :class="{ 'pulse-animate': !showInfo.exp }">
          {{ showInfo.exp ? `${experienceText} 프론트엔드 개발자` : '경력' }}
        </p>
      </div>
    </div>
  </CardWrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import CardWrapper from '@/components/CardWrapper.vue'

// 클릭 시 토글될 항목 상태
const showInfo = ref({
  name: false,
  birth: false,
  exp: false,
})

// 항목 토글 함수
const toggleInfo = (type) => {
  showInfo.value[type] = !showInfo.value[type]
}

// 경력 계산
const startDate = new Date('2023-12-04')
const today = new Date()
const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))

const experienceText = computed(() => {
  let years = today.getFullYear() - startDate.getFullYear()
  let months = today.getMonth() - startDate.getMonth()
  if (months < 0) {
    years--
    months += 12
  }
  return `${years}년 ${months}개월 / 총 ${totalDays}일째`
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 50px;
  text-align: start;
  width: 80%;
}
.home-profile {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 100px;
  width: 100%;

  & img {
    width: 200px;
    border-radius: 10px;
  }

  .profile-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;

    p {
      font-size: 20px;
      padding: 10px 0;
      cursor: pointer;
      user-select: none;
      transition: color 0.3s ease;

      &.pulse-animate {
        animation: glow 2s ease-in-out infinite;
        color: #dddddd;
      }

      &:hover {
        color: #3a86ff;
      }
    }
  }
}
@keyframes glow {
  0% {
    text-shadow:
      0 0 6px rgba(180, 180, 180, 0.5),
      0 0 10px rgba(200, 200, 200, 0.45);
  }
  50% {
    text-shadow:
      0 0 8px rgba(200, 200, 200, 0.55),
      0 0 14px rgba(220, 220, 220, 0.7);
  }
  100% {
    text-shadow:
      0 0 6px rgba(180, 180, 180, 0.5),
      0 0 10px rgba(200, 200, 200, 0.45);
  }
}
</style>
