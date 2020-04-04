import firebase from "firebase";
//import { User } from 'firebase/app';
// import 'firebase/firestore'; // if database type is firestore, import this 

export const getUserSettings = async () => {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const userdoc = await db.collection("users").doc(user?.uid).get();
  return userdoc.data();
}

export const updateUserSettings = async (settings: {[key: string]: any}) => {
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();

  db.collection("users").doc(user?.uid).set(settings);
}

export const signUserInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    const signIn = await firebase
       .auth()
       .signInWithEmailAndPassword(email, password)

    return signIn;
  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const signUserInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  try {
    await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    const signIn = await firebase
          .auth()
          .signInWithPopup(provider)

    return signIn;
  } catch(e) {
    console.log(e.message);
    throw Error(e.message);
  }
}

export const signUserOut = async () => {
  firebase.auth().signOut().then(function() {
    return true;
  });
}