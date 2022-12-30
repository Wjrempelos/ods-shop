import { initializeApp } from 'firebase/app';
import { getAuth,
         signInWithRedirect,
         signInWithPopup,
         GoogleAuthProvider, 
        } from 'firebase/auth'
        
import {
        getFirestore,
        doc,
        getDoc,
        setDoc
        } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAG7OJmXEjpbv3RGr11yN8XNNVVA9CX_EA",
    authDomain: "ods-shop.firebaseapp.com",
    projectId: "ods-shop",
    storageBucket: "ods-shop.appspot.com",
    messagingSenderId: "388935464843",
    appId: "1:388935464843:web:67ee3a72ed0d669e8ce18e"
  };

  

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
          });  
        } catch (error) {
            console.log('error creating the user', error.message);
        };
    }

    return userDocRef;
  };