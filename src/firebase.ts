import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyD76G3U8DBQ71zZMuCljoxLA1503d6GmR0',
  authDomain: 'pokkit-parent.firebaseapp.com',
  projectId: 'pokkit-parent',
  storageBucket: 'pokkit-parent.firebasestorage.app',
  messagingSenderId: '948306955060',
  appId: '1:948306955060:web:3973fb750ef584595cb361',
}

export const app = initializeApp(firebaseConfig)
