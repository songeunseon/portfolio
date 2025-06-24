<template>
  <CardWrapper id="profile" :index="0">
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

//경력 계산
const startDate = new Date('2023-12-04')
const today = new Date()

// 날짜 차이만 계산 (시간 무시)
const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
const end = new Date(today.getFullYear(), today.getMonth(), today.getDate())

const diffTime = end.getTime() - start.getTime()
const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1

const experienceText = computed(() => {
  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prevMonthEnd = new Date(end.getFullYear(), end.getMonth(), 0).getDate()
    days += prevMonthEnd
  }

  if (months < 0) {
    years--
    months += 12
  }

  return `${years}년 ${months}개월 ${days + 3}일째 \n 총 ${totalDays}일째`
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
  height: 100%;

  & img {
    height: 250px;
    border-radius: 10px;
  }

  .profile-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    height: 250px;
    p {
      font-size: 20px;
      line-height: 1.56;
      // padding: 10px 0;
      cursor: pointer;
      user-select: none;
      transition: color 0.3s ease;
      white-space: pre-line;
      text-align: left;

      &.pulse-animate {
        animation: glow 2s ease-in-out infinite;
        color: #dddddd;
      }

      &:hover {
        color: #b0d8df;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;

    & img {
      width: 150px;
    }

    .profile-text {
      align-items: center;
      text-align: center;
      width: 100%;

      p {
        font-size: 20px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 30px;

    & img {
      width: 130px;
    }

    .profile-text {
      align-items: center;
      text-align: center;
      width: 100%;

      p {
        font-size: 15px;
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
