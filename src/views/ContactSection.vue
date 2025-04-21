<template>
  <CardWrapper id="contact" :index="3">
    <div class="partGroup">
      <p class="title">Contact</p>
      <!-- 이력서 다운로드 -->
      <div class="part" @mouseenter="startSlide" @mouseleave="stopSlide">
        <img src="/image/download.png" />
        <a href="/pdf/끊임없는 성장을 추구하는 프론트엔드 개발자 송은선.pdf" download>
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
      </div>

      <!-- 이메일 타이핑 미리보기 -->
      <div v-if="showMailPreview" class="mail-preview">
        <table class="mail-table">
          <tbody>
            <tr>
              <td class="label">보내는 사람</td>
              <td class="value">ttioni_v0v@naver.com</td>
            </tr>
            <tr>
              <td class="label">제목</td>
              <td class="value">포트폴리오 관련 문의드립니다</td>
            </tr>
            <tr>
              <td class="label" colspan="2">내용</td>
            </tr>
            <tr>
              <td class="body" colspan="2">{{ mailTypedContent }}</td>
            </tr>
          </tbody>
        </table>
        <div class="email-btn">
          <p>보내기</p>
          <img src="/public/image/plane.png" />
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
  '/png/images-0.png',
  '/png/images-1.png',
  '/png/images-2.png',
  '/png/images-3.png',
  '/png/images-4.png',
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

const showMailPreview = ref(false)
const mailTypedContent = ref('')
const typingIndex = ref(0)
const fullBody =
  '안녕하세요. 저는 Front-end Developer 송은선입니다.\n처음 맡는 일이더라도 늘 최선을 다해 마주해왔고, 모든 작업에 있어 ‘어떻게 하면 더 나아질 수 있을까’를 고민하며 성실하게 임했습니다.\n이 포트폴리오에 담긴 결과들은 그런 과정의 흔적입니다.\n \n짧은 경력이지만 태도는 정직했고, 모르는 걸 두려워하기보단 배울 기회를 반가워했습니다.\n“함께 일하고 싶은 사람인가?”라는 질문에 ‘괜찮네?’라는 생각이 드셨다면, 그건 이미 반은 성공한 것 같습니다.\n \n앞으로도 "함께 일하고 싶은 사람"으로 기억될 수 있도록 성장해 나가겠습니다.\n직접 만나 이야기를 나눌 수 있는 기회를 기다리고 있겠습니다 :)\n감사합니다.'
let typingTimer = null

watch(showMailPreview, (val) => {
  if (val) {
    mailTypedContent.value = ''
    typingIndex.value = 0
    typingTimer = setInterval(() => {
      if (typingIndex.value < fullBody.length) {
        mailTypedContent.value += fullBody[typingIndex.value]
        typingIndex.value++
      } else {
        clearInterval(typingTimer)
      }
    }, 50)
  } else {
    clearInterval(typingTimer)
  }
})

// GitHub 툴팁
const showGithub = ref(false)
</script>

<style lang="scss" scoped>
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
.title {
  font-size: 50px;
  text-align: start;
  width: 80%;
}
.part {
  position: relative;
  left: -30%;
  transform: translate(0%);
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  transform-origin: left center;
  transition:
    transform 0.5s ease,
    opacity 0.3s ease;
  opacity: 0.5;
  cursor: pointer;
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
  width: 450px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
  z-index: 100;
  background: white;
  padding: 10px;
  border-radius: 5px;
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

.mail-preview {
  width: 450px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
  background: #fff;
  padding: 10px;
  font-size: 13px;
  border-radius: 5px;
  z-index: 99;
  color: #333;
}

.mail-table {
  width: 100%;
  border-spacing: 0;
}

.mail-table td {
  padding: 8px;
  vertical-align: top;
}

.mail-table .label {
  width: 80px;
  text-align: start;
  font-weight: bold;
  color: #aaa;
  white-space: nowrap;
}

.mail-table .value {
  color: #555;
}

.mail-table .body {
  font-size: 12px;
  padding-top: 12px;
  text-align: start;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  white-space: pre-line;
  font-family: 'SUIT';
  letter-spacing: 1px;
}
.email-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 80px;
  height: 30px;
  /* border: 1px solid #333; */
  border-radius: 5px;
  background-color: #005fe5;
  animation: blink 1s infinite;
  animation-delay: 15s;
  & p {
    color: #e1e1e1;
    font-size: 12px;
  }
  & img {
    width: fit-content;
    height: 15px;
  }
}
@keyframes blink {
  0%,
  100% {
    background-color: #005fe5;
  }
  50% {
    background-color: #005fe599;
  }
}
/* GitHub 툴팁 */
.github-tooltip {
  width: 450px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
  z-index: 100;
  background: #fff;
  color: #333;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  animation: fadeIn 0.7s ease-in-out;
}

.github-tooltip ul {
  padding-left: 20px;
  margin: 10px 0;
  list-style-type: none;
}
.github-tooltip li {
  margin-bottom: 4px;
  text-align: start;
}
.preview-box,
.mail-preview,
.github-tooltip {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
