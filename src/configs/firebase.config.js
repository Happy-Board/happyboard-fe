import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY ? import.meta.env.VITE_FIREBASE_APIKEY : "AIzaSyDsslSSUsO4hQ4_nMj2vItDXPNBOQzBgro",
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : "happy-board-a51e5.firebaseapp.com",
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? import.meta.env.VITE_FIREBASE_PROJECT_ID : "happy-board-a51e5",
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET : "happy-board-a51e5.firebasestorage.app",
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID : "237833385585",
//   appId: import.meta.env.VITE_FIREBASE_APP_ID ? import.meta.env.VITE_FIREBASE_APP_ID : "1:237833385585:web:ef8c2495b0fa132f528dd0" ,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMRNT_ID ? import.meta.env.VITE_FIREBASE_MEASUREMRNT_ID : "G-P70ZYYS2ET",
// };

const firebaseConfig = {
  apiKey: 'AIzaSyDsslSSUsO4hQ4_nMj2vItDXPNBOQzBgro',
  authDomain: 'happy-board-a51e5.firebaseapp.com',
  projectId: 'happy-board-a51e5',
  storageBucket: 'happy-board-a51e5.firebasestorage.app',
  messagingSenderId: '237833385585',
  appId: '1:237833385585:web:ef8c2495b0fa132f528dd0',
  measurementId: 'G-P70ZYYS2ET',
  vapid: {
    publicKey: "BDVf-tObzeoEUWbf1Ea65G6367EaZHhkVioiwtVGIrEVgkFtk9cdaOHmaHQI-nX0N7J78bpFM1936fEs8HDTAaM",
    privateKey: "2LEZpwDVou22KKpfDj9KqRX27c0s7e_3ekaS-eDlHZs"
  }
}

const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

export const requestPermission = async () => {
  return Notification.requestPermission().then(async (permission) => {
    if (permission === 'granted') {
      return getToken(messaging, {
        vapidKey: firebaseConfig.vapid.publicKey
      })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem('device-token', currentToken)
          } else {
            console.log('Failed to generate the app registration token')
          }
        })
        .catch((err) => {
          console.log('An error occurred when requesting to receive the token.', err)
        })
    } else {
      console.log('User Permission Denied')
    }
  })
}

// export const onMessageListener = () => {
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         })
//     })
// }
