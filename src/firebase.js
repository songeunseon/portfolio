// firebase.js
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child, push, remove } from 'firebase/database'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD4IXapM9hA92WykaOzFf2bSHUlSLzp-eo',
  authDomain: 'portfolio-1dc61.firebaseapp.com',
  projectId: 'portfolio-1dc61',
  storageBucket: 'portfolio-1dc61.appspot.com',
  messagingSenderId: '970610183493',
  appId: '1:970610183493:web:7038aae6d199d24638c22c',
  measurementId: 'G-Z7PGWRRSWP',
  databaseURL: 'https://portfolio-1dc61-default-rtdb.firebaseio.com',
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export {
  db,
  ref,
  set,
  get,
  child,
  push,
  remove,
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
}
