/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDDuDRFfKyrub4CA58RDj3iqqf641R3-Aw",
    authDomain: "happyboard-123.firebaseapp.com",
    projectId: "happyboard-123",
    storageBucket: "happyboard-123.appspot.com",
    messagingSenderId: "500567881708",
    appId: "1:500567881708:web:b13454b331fec5de0ab2c9",
    measurementId: "G-X71685PTG3",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)

    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
})