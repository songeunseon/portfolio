<template>
  <CardWrapper id="about" :index="1">
    <p class="title">About Me</p>
    <div class="aboutme">
      <div class="card-section">
        <div class="card-item" v-for="(section, index) in sections" :key="index">
          <div class="card-header" @click="toggleSection(index)">
            <div class="card-icon">
              <img :src="section.icon" alt="icon" />
            </div>
            <p>{{ section.title }}</p>
          </div>

          <!-- 카드 아래에 펼쳐지는 내용 -->
          <transition name="fade-slide">
            <div v-if="activeIndex === index" class="card-content">
              <div class="content-box">
                <p v-for="(text, i) in section.content" :key="i" v-html="text"></p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 카드 바깥에서 조건부 안내창 표시 -->
      <transition name="fade-slide">
        <div v-if="activeIndex === null" class="card-content">
          <div class="content-box">
            <p style="margin-top: 180px">
              카드를 선택하시면 저에 대한 이야기를 확인할 수 있어요 :)
            </p>
          </div>
        </div>
      </transition>
    </div>
  </CardWrapper>
</template>

<script setup>
import { ref } from 'vue'
import CardWrapper from '@/components/CardWrapper.vue'

const activeIndex = ref(null)

const toggleSection = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const sections = [
  {
    icon: '/image/person.png',
    title: '개발자인 나',
    content: [
      '사용자 경험을 우선으로 생각하며, 협업과 소통을 중요하게 여기는 프론트엔드 개발자입니다.',
      '혼자 빠르게 만드는 것보다, 함께 성장하고 책임지는 과정을 소중히 생각합니다.',
      '작은 UI 오류도 놓치지 않으려는 꼼꼼함과,',
      '일정 내에서 품질을 지키기 위한 균형 감각을 키워가고 있습니다.',
    ],
  },
  {
    icon: '/image/code.png',
    title: '재직기간 경험',
    content: [
      'Vue.js를 중심으로 대시보드, 관리자 페이지, 시각화 UI 등 다양한 실무 프로젝트에 참여했습니다.',
      'Three.js 기반 3D 인터랙션, Highcharts.js 실시간 차트 등 시각적 데이터 표현에도 관심이 많습니다.',
      '기획 변경이나 이슈 대응이 잦은 환경에서도 유연하게 소통하며,',
      '기한과 품질을 모두 고려한 개발을 실천하고 있습니다.',
    ],
  },
  {
    icon: '/image/compass.png',
    title: '추구하는 방향',
    content: [
      '재사용성과 가독성을 고려한 컴포넌트 중심 구조를 지향하며,',
      '완벽하지 않아도 리뷰를 당당히 받을 수 있는 코드를 쓰고자 노력합니다.',
      '협업에서는 열린 소통을 중시하며,',
      '모르는 것에 솔직하고 배우는 데 주저하지 않는 개발자가 되고자 합니다.',
    ],
  },
  {
    icon: '/image/target.png',
    title: '2025년 목표',
    content: [
      '정보처리기사, SQLD 자격증 취득',
      '백엔드 기술 학습 및 실전 적용 역량 확보',
      '프론트와 백엔드를 아우를 수 있는 실무형 풀스택 역량 강화',
      '<em>자격과 실력을 겸비한 풀스택형 프론트엔드 개발자로 성장하겠습니다.</em>',
    ],
  },
]

</script>

<style lang="scss" scoped>
.title {
  font-size: 50px;
  text-align: start;
  width: 80%;
}
.aboutme {
  width: 80%;
  margin: 0 auto;
  color: #fff;

  .card-section {
    width: 100%;
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .card-item {
      width: 22%;
      .card-header {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 5px 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: background 0.3s ease;

        .card-icon {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        span {
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .rotated {
          transform: rotate(180deg);
        }

        &:hover {
          background: rgba(255, 255, 255, 0.08);
        }
      }

      .card-content {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, -10%);
        width: 90%;

        .content-box {
          height: fit-content;
          background: rgba(255, 255, 255, 0.05);
          padding: 10px 20px;
          border-radius: 12px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
          p {
            font-size: 14px;
            line-height: 1.67;
            text-align: start;
          }
          ::v-deep(em) {
            font-size: 14px;
            font-style: italic;
            color: #b0d8df;
            text-decoration: underline;
          }
        }
      }
    }
  }

  // 부드러운 아래 펼침 애니메이션
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.4s ease;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-slide-enter-to,
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
