import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDDuDRFfKyrub4CA58RDj3iqqf641R3-Aw",
    authDomain: "happyboard-123.firebaseapp.com",
    projectId: "happyboard-123",
    storageBucket: "happyboard-123.appspot.com",
    messagingSenderId: "500567881708",
    appId: "1:500567881708:web:b13454b331fec5de0ab2c9",
    measurementId: "G-X71685PTG3",
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
