import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ? import.meta.env.VITE_FIREBASE_APIKEY : "AIzaSyDDuDRFfKyrub4CA58RDj3iqqf641R3-Aw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : "happyboard-123.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? import.meta.env.VITE_FIREBASE_PROJECT_ID : "happyboard-123",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET : "happyboard-123.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID : "500567881708",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? import.meta.env.VITE_FIREBASE_APP_ID : "1:500567881708:web:b13454b331fec5de0ab2c9" ,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMRNT_ID ? import.meta.env.VITE_FIREBASE_MEASUREMRNT_ID : "G-X71685PTG3",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = () => {
    return Notification.requestPermission().then((permission) => {
        if (permission === "granted") {

            return getToken(messaging, {
                vapidKey: "BJq6mv4s8HbHHz6U4ES7BmXnowUiecmzAqN3BFOZI8U1Md1MSQn0tx4PMDEFRIGCl1KPnv87sZ_-W-sG3wMHYvI",
            })
                .then((currentToken) => {
                if (currentToken) {
                    localStorage.setItem('device-token', currentToken)
                } else {
                    console.log("Failed to generate the app registration token");
                }
            })
            .catch((err) => {
            console.log("An error occurred when requesting to receive the token.", err);
            });
        } else {
        console.log("User Permission Denied");
        }
    });
};

// export const onMessageListener = () => {
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         })
//     })
// }
