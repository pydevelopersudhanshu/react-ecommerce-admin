importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js")
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAKMozG84lfhZYY98m2GuIQYkOmCdr7nEo",
  authDomain: "sharedecommerceproject.firebaseapp.com",
  projectId: "sharedecommerceproject",
  storageBucket: "sharedecommerceproject.appspot.com",
  messagingSenderId: "598994614607",
  appId: "1:598994614607:web:aca313800afc9d97eaad3a",
  measurementId: "G-LEB54WCN00"
};
firebase.initializeApp(firebaseConfig)
// Retrieve firebase messaging
const messaging = firebase.messaging()
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})