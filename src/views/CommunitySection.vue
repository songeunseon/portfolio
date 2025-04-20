<template>
  <CardWrapper id="community" :index="4" v-show="readyToShow">
    <div class="editor-container">
      <!-- 질문 작성 -->
      <ToastEditor v-model="newQuestion" />

      <button class="submit-btn" @click="submitQuestion">
        {{ editingIndex !== null ? '질문 수정' : '질문 등록' }}
      </button>

      <!-- 질문 리스트 -->
      <div class="question-list">
        <div v-for="(qna, index) in qnaList" :key="qna.id || index" class="qna-item">
          <p class="question-text">🙋 {{ qna.question }}</p>

          <!-- 댓글 -->
          <div v-if="qna.answer" class="answer-text">💬 {{ qna.answer }}</div>

          <!-- 댓글 입력 -->
          <div v-else class="answer-form">
            <input v-model="qna.tempAnswer" placeholder="답변을 입력하세요" class="answer-input" />
            <button @click="submitAnswer(index)" class="submit-btn">답변 등록</button>
          </div>

          <!-- 수정/삭제 버튼 -->
          <div class="action-buttons">
            <button class="edit-btn" @click="editQuestion(index)">수정</button>
            <button class="delete-btn" @click="deleteQuestion(index)">삭제</button>
          </div>
        </div>
      </div>
    </div>
  </CardWrapper>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import CardWrapper from '@/components/CardWrapper.vue'
import ToastEditor from '@/components/editor.vue' // Toast UI Editor
import { db, ref as dbRef, push, set, get, child, remove } from '@/firebase'

const newQuestion = ref('')
const qnaList = ref([])
const editingIndex = ref(null)
const readyToShow = ref(false)

// ✅ 렌더 안정 후 보이게 (스크롤 튐 방지)
onMounted(async () => {
  setTimeout(() => {
    readyToShow.value = true
  }, 400)

  const saved = localStorage.getItem('qna-list')
  if (saved) {
    qnaList.value = JSON.parse(saved)
  } else {
    const snapshot = await get(child(dbRef(db), 'qna-list'))
    if (snapshot.exists()) {
      const data = snapshot.val()
      qnaList.value = Object.entries(data).map(([id, value]) => ({
        ...value,
        id,
      }))
    }
  }
})

// 질문 등록 및 수정
const submitQuestion = async () => {
  if (!newQuestion.value.trim()) return

  const item = {
    question: newQuestion.value,
    answer: '',
    tempAnswer: '',
  }

  if (editingIndex.value !== null) {
    const id = qnaList.value[editingIndex.value].id
    await set(dbRef(db, `qna-list/${id}`), item)
    qnaList.value[editingIndex.value] = { ...item, id }
    editingIndex.value = null
  } else {
    const newRef = push(dbRef(db, 'qna-list'))
    await set(newRef, item)
    qnaList.value.push({ ...item, id: newRef.key })
  }

  newQuestion.value = ''
}

// 답변 등록
const submitAnswer = (index) => {
  const item = qnaList.value[index]
  if (!item.tempAnswer.trim()) return
  item.answer = item.tempAnswer
  item.tempAnswer = ''
}

// 질문 수정
const editQuestion = (index) => {
  newQuestion.value = qnaList.value[index].question
  editingIndex.value = index
}

// 질문 삭제
const deleteQuestion = async (index) => {
  const item = qnaList.value[index]
  if (!item.id) return
  await remove(dbRef(db, `qna-list/${item.id}`))
  qnaList.value.splice(index, 1)
}

// localStorage 저장
watch(
  qnaList,
  (val) => {
    localStorage.setItem('qna-list', JSON.stringify(val))
  },
  { deep: true }
)
</script>

<style scoped>
.editor-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.answer-input {
  width: 70%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #aaa;
  border-radius: 4px;
  margin-right: 10px;
}

.submit-btn {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #3a86ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.qna-item {
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

.question-text {
  font-weight: bold;
  font-size: 16px;
}

.answer-text {
  margin-top: 10px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
}

.action-buttons {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background-color: #ffc107;
  color: #000;
}

.delete-btn {
  background-color: #ff4d4f;
  color: #fff;
}
</style>
