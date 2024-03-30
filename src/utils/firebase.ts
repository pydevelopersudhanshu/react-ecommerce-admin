// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import env from "./env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE_MESSAGE_SENDER_ID,
    appId: env.FIREBASE_APP_ID,
    measurementId: env.FIREBASE_MEASURMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
    const analytics = getAnalytics(app);
}
export const getFirebaseMessageToken = async () => {
    debugger
    let isSupport = await isSupported()
    if (isSupport) {
        const messaging = getMessaging(app);
        console.log('messaging',messaging);
        console.log('app',app);
        console.log('firebaseConfig',firebaseConfig );

        try {
            let tokenId = await getToken(messaging, { vapidKey: env.FIREBASE_VAP_ID_KEY, })
            console.log('tokenId',tokenId);
            return { tokenId }
        } catch (error) {
            console.log('getFirebaseMessageToken',error);
            return { error }
        }
    }
    else {
        console.log('err');
        
        return { error: " Notification Not Supported" }
    }
}
// export const onMessageListener = () => {
//     const messaging = getMessaging(app);
//     return new Promise((resolve, reject) => {
//         if (messaging) {
//             messaging.onMessage((payload) => {
//                 resolve(payload)
//             })
//         } else {
//             reject(null)
//         }
//     })
// }
export const requestNotification = async () => {
    debugger
    console.log(typeof Notification?.permission);
    console.log(Notification?.permission);
    console.log(Notification?.permission !== 'denied');
    
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return ""
    }
    else if (Notification?.permission === "granted") {
        let { tokenId, error } = await getFirebaseMessageToken()
        
        if (error) {
            console.log("enableNotification error", error);
            return ""
        }
        console.log(tokenId);
        
        return tokenId
    }
    else if (Notification?.permission !== 'denied' ) {
        if(Notification?.permission === 'default'){
        Notification.requestPermission().then(async (permission) => {
            console.log('permission',permission);
            if (permission === "granted") {
                
                let { tokenId, error } = await getFirebaseMessageToken()
                if (error) {
                    console.log("enableNotification error", error);
                    return ""
                }
                return tokenId

            } else {
                console.log("permission", permission);
                return ""
            }
        });
    }
    } else {
        return ""
    }
}
export default app