<template>
  <CardWrapper id="contact">
    <div class="partGroup">
      <!-- 이력서 다운로드 -->
      <div class="part" @mouseenter="startSlide" @mouseleave="stopSlide">
        <img src="/image/download.png" />
        <a href="/pdf/이력서.pdf" download>
          <p>송은선 이력서 다운로드</p>
        </a>
      </div>

      <!-- 이력서 미리보기 슬라이드 -->
      <div v-if="showPreview" class="preview-box">
        <transition-group name="flip" tag="div" class="slide-wrapper">
          <img
            v-for="(img, i) in imageList"
            :key="i === currentIndex ? i : null"
            v-show="i === currentIndex"
            :src="img"
            alt="이력서 슬라이드"
            class="slide-image"
          />
        </transition-group>
      </div>

      <!-- 이메일 항목 -->
      <div class="part" @mouseenter="showMailPreview = true" @mouseleave="showMailPreview = false">
        <img src="/image/plane.png" />
        <a href="mailto:ttioni_v0v@naver.com"><p>ttioni_v0v@naver.com</p></a>

        <!-- 이메일 타이핑 미리보기 -->
        <div v-if="showMailPreview" class="mail-preview">
          <pre>{{ mailContent }}</pre>
        </div>
      </div>

      <!-- GitHub 항목 -->
      <div class="part" @mouseenter="showGithub = true" @mouseleave="showGithub = false">
        <img src="/image/branch.png" />
        <a href="https://github.com/songeunseon" target="_blank"><p>@songeunseon</p></a>

        <div v-if="showGithub" class="github-tooltip">
          👉 제 GitHub에서 더 많은 프로젝트를 확인해보세요!
        </div>
      </div>
    </div>
  </CardWrapper>
</template>

<script setup>
import { ref, watch } from 'vue'
import CardWrapper from '@/components/CardWrapper.vue'

// 이력서 슬라이드
const showPreview = ref(false)
const currentIndex = ref(0)
const intervalId = ref(null)

const imageList = [
  '/jpg/images-0.jpg',
  '/jpg/images-1.jpg',
  '/jpg/images-2.jpg',
  '/jpg/images-3.jpg',
  '/jpg/images-4.jpg',
  '/jpg/images-5.jpg',
]

const startSlide = () => {
  showPreview.value = true
  currentIndex.value = 0
  intervalId.value = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % imageList.length
  }, 3000)
}
const stopSlide = () => {
  showPreview.value = false
  clearInterval(intervalId.value)
}

// 이메일 타이핑 효과
const showMailPreview = ref(false)
const mailContent = ref('')
const typingIndex = ref(0)
const fullMail = `제목: 포트폴리오 관련 문의드립니다\n내용: 안녕하세요. 송은선 개발자님, 포트폴리오 잘 보았습니다.`

let typingTimer = null

watch(showMailPreview, (val) => {
  if (val) {
    mailContent.value = ''
    typingIndex.value = 0
    typingTimer = setInterval(() => {
      if (typingIndex.value < fullMail.length) {
        mailContent.value += fullMail[typingIndex.value]
        typingIndex.value++
      } else {
        clearInterval(typingTimer)
      }
    }, 100)
  } else {
    clearInterval(typingTimer)
  }
})

// GitHub 툴팁
const showGithub = ref(false)
</script>

<style scoped>
.partGroup {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow: visible;
  position: relative;
}

.part {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  transform-origin: left center;
  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
  opacity: 0.5;
}
.part img {
  width: fit-content;
  height: 20px;
}
.part:hover {
  transform: scale(1.2);
  opacity: 1;
}
a {
  text-decoration: none;
  color: #555;
  font-size: 20px;
}
.part:hover a p {
  color: #fff;
}

/* 이력서 미리보기 */
.preview-box {
  width: 300px;
  height: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
  z-index: 100;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 4px;
  perspective: 1000px;
  overflow: hidden;
}
.slide-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.slide-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 책장 넘김 효과 */
.flip-enter-active,
.flip-leave-active {
  transition:
    transform 0.8s ease,
    opacity 0.8s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.flip-enter-from {
  transform: rotateY(90deg);
  opacity: 0;
}
.flip-enter-to {
  transform: rotateY(0);
  opacity: 1;
}
.flip-leave-from {
  transform: rotateY(0);
  opacity: 1;
}
.flip-leave-to {
  transform: rotateY(-90deg);
  opacity: 0;
}

/* 이메일 미리보기 (타이핑 영역) */
.mail-preview {
  width: 300px;
  height: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
  background: #333;
  padding: 10px;
  font-size: 10px;
  border-radius: 6px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  z-index: 99;
  animation: fadeIn 0.3s ease-in-out;
}
.mail-preview pre {
  margin: 0;
  white-space: pre-line;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* GitHub 툴팁 */
.github-tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
  background: #555;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;
  height: 450px;
  z-index: 99;
  animation: fadeIn 0.3s ease-in-out;
}
</style>
