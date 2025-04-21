<template>
  <CardWrapper id="community" :index="4" v-show="readyToShow">
    <div class="community-wrapper">
      <!-- 왼쪽: 질문 작성 -->
      <div class="editor-panel">
        <ToastEditor v-model="newQuestion" />
        <button class="submit-btn" @click="submitQuestion">
          {{ editingIndex !== null ? '질문 수정' : '질문 등록' }}
        </button>

        <!-- 로그인 영역 -->
        <div class="auth-info">
          <p v-if="currentUser">로그인됨: {{ currentUser.email }}</p>
          <template v-if="currentUser">
            <button class="login-btn" @click="logout">로그아웃</button>
          </template>
          <template v-else>
            <input v-model="email" placeholder="이메일" class="auth-input" />
            <input v-model="password" type="password" placeholder="비밀번호" class="auth-input" />
            <div class="auth-buttons">
              <button class="login-btn" @click="loginWithEmail">이메일 로그인</button>
              <button class="login-btn" @click="register">회원가입</button>
              <button class="login-btn" @click="loginWithGoogle">구글 로그인</button>
            </div>
          </template>
        </div>
      </div>

      <!-- 오른쪽: 질문 리스트 -->
      <div class="list-panel">
        <div class="question-list">
          <div v-for="(qna, index) in qnaList" :key="qna.id || index" class="qna-item">
            <p class="question-text">🙋 {{ qna.question }}</p>
            <p class="writer-id">작성자: {{ qna.writerId || '익명' }}</p>

            <!-- 답변 -->
            <div v-if="qna.answer" class="answer-text">
              💬 {{ qna.answer }}
              <p class="writer-id" style="margin-top: 6px; font-size: 12px">
                작성자: {{ qna.adminId || '관리자' }}
              </p>
            </div>
            <div v-else>
              <div v-if="isAdmin" class="answer-form">
                <input
                  v-model="qna.tempAnswer"
                  placeholder="답변을 입력하세요"
                  class="answer-input"
                />
                <button @click="submitAnswer(index)" class="submit-btn">답변 등록</button>
              </div>
              <p v-else style="font-size: 12px; color: #888; margin-top: 10px">
                ⚠️ 답변은 관리자만 등록할 수 있습니다.
              </p>
            </div>

            <!-- 수정/삭제 -->
            <div class="action-buttons" v-if="isAdmin">
              <button class="edit-btn" @click="editQuestion(index)">수정</button>
              <button class="delete-btn" @click="deleteQuestion(index)">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CardWrapper>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import CardWrapper from '@/components/CardWrapper.vue'
import ToastEditor from '@/components/editor.vue'
import { db, ref as dbRef, push, set, get, child, remove, auth } from '@/firebase'
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const ADMIN_EMAIL = 'ses920525@gmail.com'
const currentUser = ref(null)
const isAdmin = ref(false)

const newQuestion = ref('')
const qnaList = ref([])
const editingIndex = ref(null)
const readyToShow = ref(false)

const email = ref('')
const password = ref('')

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

const logout = async () => {
  await signOut(auth)
  currentUser.value = null
  isAdmin.value = false
}

const register = async () => {
  if (!email.value || !password.value) return alert('이메일과 비밀번호를 입력하세요.')
  try {
    const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
    currentUser.value = result.user
    isAdmin.value = result.user.email === ADMIN_EMAIL
  } catch (err) {
    alert('회원가입 실패: ' + err.message)
  }
}

const loginWithEmail = async () => {
  if (!email.value || !password.value) return alert('이메일과 비밀번호를 입력하세요.')
  try {
    const result = await signInWithEmailAndPassword(auth, email.value, password.value)
    currentUser.value = result.user
    isAdmin.value = result.user.email === ADMIN_EMAIL
  } catch (err) {
    alert('로그인 실패: ' + err.message)
  }
}

onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    isAdmin.value = user?.email === ADMIN_EMAIL
  })

  setTimeout(() => {
    readyToShow.value = true
  }, 400)

  const saved = localStorage.getItem('qna-list')
  if (saved) {
    qnaList.value = JSON.parse(saved).filter((item) => item?.id)
  } else {
    const snapshot = await get(child(dbRef(db), 'qna-list'))
    if (snapshot.exists()) {
      const data = snapshot.val()
      qnaList.value = Object.entries(data).map(([id, value]) => ({ ...value, id }))
    }
  }
})

const submitQuestion = async () => {
  if (!newQuestion.value.trim()) return

  const writerId = currentUser.value?.email?.split('@')[0] || '익명'
  const item = { question: newQuestion.value, answer: '', tempAnswer: '', writerId }

  if (editingIndex.value !== null) {
    const id = qnaList.value[editingIndex.value].id
    if (!id) return
    await set(dbRef(db, `qna-list/${id}`), item)
    qnaList.value[editingIndex.value] = { ...item, id }
    editingIndex.value = null
  } else {
    const newRef = push(dbRef(db, 'qna-list'))
    const id = newRef.key
    const itemWithId = { ...item, id }
    await set(newRef, itemWithId)
    qnaList.value.push(itemWithId)
  }

  newQuestion.value = ''
}

const submitAnswer = async (index) => {
  if (!isAdmin.value) return
  const item = qnaList.value[index]
  if (!item.tempAnswer?.trim()) return

  item.answer = item.tempAnswer
  item.adminId = currentUser.value?.email?.split('@')[0] || 'admin'
  item.tempAnswer = ''

  // Firebase에 저장
  await set(dbRef(db, `qna-list/${item.id}`), {
    question: item.question,
    answer: item.answer,
    writerId: item.writerId,
    adminId: item.adminId,
    tempAnswer: '',
  })
}

const editQuestion = (index) => {
  if (!isAdmin.value) return
  newQuestion.value = qnaList.value[index].question
  editingIndex.value = index
}

const deleteQuestion = async (index) => {
  if (!isAdmin.value) return
  const item = qnaList.value[index]
  if (!item?.id) return
  await remove(dbRef(db, `qna-list/${item.id}`))
  qnaList.value.splice(index, 1)
}

watch(
  qnaList,
  (val) => {
    localStorage.setItem('qna-list', JSON.stringify(val))
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
.community-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 40px;
  padding: 20px;
  justify-content: space-evenly;
}
.editor-panel,
.list-panel {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.auth-info {
  margin-top: 10px;
  font-size: 14px;
  color: #444;
}
.auth-input {
  padding: 6px;
  margin: 5px 10px;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 13px;
}
.auth-buttons {
  display: flex;
  justify-content: space-evenly;
  gap: 6px;
  flex-wrap: wrap;
}
.login-btn {
  padding: 6px 10px;
  font-size: 13px;
  background-color: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.question-list {
  flex: 1;
  overflow-y: auto;
  max-height: 45vh;
  padding-right: 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scrollbar-width: thin;
  -ms-overflow-style: none;
}
.question-list::-webkit-scrollbar {
  width: 6px;
}
.question-list::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
}
.qna-item {
  border-top: 1px solid #ddd;
  padding-top: 15px;
}
.question-text {
  font-weight: bold;
  font-size: 12px;
}
.writer-id {
  font-size: 10px;
  color: #666;
  margin-top: 5px;
}
.answer-text {
  font-size: 12px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
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
  background-color: #b0d8df;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #388694;
    color: #000;
  }
}
.action-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
}
.edit-btn {
  background-color: #ffc107;
  color: #fff;
  padding: 5px 20px;
  font-size: 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    color: #000;
    background-color: #e9af00;
  }
}
.delete-btn {
  background-color: #fd2f32;
  color: #fff;
  padding: 5px 20px;
  font-size: 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    color: #000;
    background-color: #c50003;
  }
}
</style>
