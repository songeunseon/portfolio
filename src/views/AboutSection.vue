<template>
  <CardWrapper id="about">
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
      '프론트엔드 개발자로서 사용자 경험을 최우선에 두며, 문제 해결과 팀워크를 중요하게 생각합니다.',
      '빠르게 혼자 완성하는 것보다, 함께 성장하고 소통하는 개발자가 되기 위해 피드백을 주고받는 과정을 소중히 여기고 있습니다.',
      '작은 UI 오류 하나도 놓치지 않으려는 꼼꼼함과,',
      '일정 안에서 유연하게 조율할 수 있는 밸런스를 갖추기 위해 꾸준히 노력하고 있습니다.',
    ],
  },
  {
    icon: '/image/code.png',
    title: '재직기간 경험',
    content: [
      'Vue.js를 중심으로 다양한 실무 프로젝트에 참여하며, 대시보드, 관리자 페이지, 데이터 시각화 UI 등을 직접 구현해왔습니다.',
      'Three.js를 활용한 3D 인터랙션, Highcharts.js 기반의 실시간 차트 등 시각적인 정보 전달 방식에 꾸준히 관심을 갖고 있습니다.',
      '기획 변경이나 기술적 이슈가 잦은 환경에서도 유연하게 대응하며,',
      '일정과 품질을 함께 관리하는 데 집중하고 있습니다.',
    ],
  },
  {
    icon: '/image/compass.png',
    title: '추구하는 방향',
    content: [
      '프로젝트에서는 최적화된 코드와 재사용 가능한 컴포넌트 구조를 지향하며, 유지보수성과 가독성을 중요하게 생각합니다.',
      '완벽하지 않더라도 코드 리뷰를 당당하게 받을 수 있는 코드를 작성하려 노력하고 있으며,',
      '협업 시 열린 소통을 두려워하지 않습니다.',
      '무엇보다 모르는 것에 솔직하고, 부끄러워하지 않으며 배움에 유연한 개발자가 되고자 합니다.',
    ],
  },
  {
    icon: '/image/target.png',
    title: '2025년 목표',
    content: [
      '정보처리기사 자격증 취득',
      '빅데이터분석기사 자격증 취득',
      '백엔드 학습을 통해 프론트와 통합 작업을 무리 없이 수행할 수 있는 실전 역량 확보',
      '<em>자격과 실력을 동시에 갖춘 풀스택형 프론트엔드 개발자로 성장하는 해로 만들겠습니다.</em>',
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
