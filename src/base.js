import firebase from "firebase";
const firebaseConfig = {
    //Put your config file here
    apiKey: "AIzaSyDioaaAoUCXmXLyRHvVvFGIvyRyyMUAiIM",
    authDomain: "escort-63de0.firebaseapp.com",
    projectId: "escort-63de0",
    storageBucket: "escort-63de0.appspot.com",
    messagingSenderId: "611953555323",
    appId: "1:611953555323:web:3d0b591497e53eda706fde",
    measurementId: "G-L0W03L7S2Z"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };