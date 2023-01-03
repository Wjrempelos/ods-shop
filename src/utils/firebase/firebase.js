import { initializeApp } from 'firebase/app';
import { getAuth,
         signInWithPopup,
         GoogleAuthProvider, 
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged
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

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
          });  
        } catch (error) {
            console.log('error creating the user', error.message);
        };
    }

    return userDocRef;
  };

  export const createAuthuserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };
  export const signInAuthuserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  };
  
  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);