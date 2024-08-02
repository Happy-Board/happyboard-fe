import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMRNT_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = () => {
    return Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted");

            return getToken(messaging, {
                vapidKey: "BJq6mv4s8HbHHz6U4ES7BmXnowUiecmzAqN3BFOZI8U1Md1MSQn0tx4PMDEFRIGCl1KPnv87sZ_-W-sG3wMHYvI",
            })
                .then((currentToken) => {
                if (currentToken) {
                    localStorage.setItem('device-token', currentToken)
                    console.log("Client Token ", currentToken);
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
