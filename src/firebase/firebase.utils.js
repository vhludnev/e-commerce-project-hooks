import firebase from 'firebase/app'; // firebase utility library
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCdYIs3ZSytrR-LQ5RwGKMl2HARpBoj174",
    authDomain: "e-commerce-22.firebaseapp.com",
    projectId: "e-commerce-22",
    storageBucket: "e-commerce-22.appspot.com",
    messagingSenderId: "851500222568",
    appId: "1:851500222568:web:b25ca76d3b0e8d6230d3dd"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setting up Google Auth utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;