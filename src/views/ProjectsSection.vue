<template>
  <CardWrapper id="projects" :index="2">
    <div class="projects-container">
      <h2 class="title">Projects</h2>
      <p class="subtitle">다양한 실무 및 개인 프로젝트를 수행했습니다.</p>

      <!-- 탭 선택 (실무 / 개인) -->
      <div class="tabs">
        <button :class="{ active: activeTab === 'work' }" @click="changeTab('work')">실무</button>
        <button :class="{ active: activeTab === 'personal' }" @click="changeTab('personal')">
          개인
        </button>
      </div>

      <!-- 카테고리 필터 -->
      <div class="categories">
        <button
          v-for="cat in categoryList"
          :key="cat"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- 프로젝트 카드 -->
      <div class="project-list">
        <div v-for="project in filteredProjects" :key="project.id" class="project-card">
          <img :src="project.image" alt="프로젝트 이미지" class="thumbnail" />
          <div class="info">
            <h3>{{ project.name }}</h3>
            <p class="desc">{{ project.description }}</p>
            <p class="stack">🛠 {{ project.stack.join(', ') }}</p>
            <p class="role">📌 역할: {{ project.role }}</p>
            <div class="links">
              <a v-if="project.link" :href="project.link" target="_blank">🔗 바로가기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CardWrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import CardWrapper from '@/components/CardWrapper.vue'

const activeTab = ref('work')
const activeCategory = ref('전체')

const categoryMap = {
  work: ['전체', '백오피스', '유지보수', '신규개발'],
  personal: ['전체', '포트폴리오', '토이', '클론'],
}

const changeTab = (tab) => {
  activeTab.value = tab
  activeCategory.value = '전체'
}

const categoryList = computed(() => categoryMap[activeTab.value])

const projects = [
  {
    id: 1,
    name: '회사 백오피스 개선',
    type: 'work',
    category: '백오피스',
    image: '/images/project-admin.png',
    description: '대시보드 UX를 개선하고 신규 API 연동을 수행',
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Firebase'],
    role: '프론트엔드 개발',
    link: null,
  },
  {
    id: 2,
    name: '포트폴리오 사이트',
    type: 'personal',
    category: '포트폴리오',
    image: '/images/project-portfolio.png',
    description: '개인 포트폴리오로 제작한 Vue 기반 SPA',
    stack: ['Vue.js', 'SCSS', 'Firebase'],
    role: '기획 / 디자인 / 개발 전부',
    link: 'https://your-portfolio-link.com',
  },
  {
    id: 3,
    name: 'Vue 토이 프로젝트',
    type: 'personal',
    category: '토이',
    image: '/images/project-toy.png',
    description: 'Composition API와 Firestore 실습용으로 제작',
    stack: ['Vue 3', 'Firebase'],
    role: '개발',
    link: null,
  },
]

const filteredProjects = computed(() => {
  return projects.filter((p) => {
    return (
      p.type === activeTab.value &&
      (activeCategory.value === '전체' || p.category === activeCategory.value)
    )
  })
})
</script>

<style lang="scss" scoped>
.projects-container {
  width: 90%;
  margin: auto;
}
.title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 5px;
}
.subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.tabs,
.categories {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  button {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    background-color: #eee;
    cursor: pointer;
    border-radius: 20px;

    &.active {
      background-color: #3a86ff;
      color: #fff;
    }
  }
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.project-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: 300px;
  transition: 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .thumbnail {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .info {
    padding: 15px;

    h3 {
      font-size: 20px;
      margin-bottom: 8px;
    }

    .desc {
      font-size: 14px;
      margin-bottom: 8px;
    }

    .stack,
    .role {
      font-size: 13px;
      color: #666;
    }

    .links {
      margin-top: 10px;

      a {
        color: #3a86ff;
        font-size: 13px;
        text-decoration: underline;
      }
    }
  }
}
</style>
