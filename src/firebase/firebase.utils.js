import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB9kF8-vQ8pYJQs2N8mECvo5S2VFiAzLXY",
    authDomain: "ecommerce-demo-37e7a.firebaseapp.com",
    projectId: "ecommerce-demo-37e7a",
    storageBucket: "ecommerce-demo-37e7a.appspot.com",
    messagingSenderId: "814081840869",
    appId: "1:814081840869:web:4d00ce95dd0dfc5676260c",
    measurementId: "G-HHDKG96EP0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef= firestore.doc(`/users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;