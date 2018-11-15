import firebase from 'firebase';

// This is the configuration provided by firebase
// we are using firebase realtime database 
// we are also using auth with google
// I AM EXPOSING THE API KEY FOR NOW PER THIS POST:
// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
const config = {
  apiKey: "AIzaSyBnbP3WZssMHCMkDVz6_RV904XF3UGrwes",
  authDomain: "factcollectr-8c6bd.firebaseapp.com",
  databaseURL: "https://factcollectr-8c6bd.firebaseio.com",
  projectId: "factcollectr-8c6bd",
  storageBucket: "factcollectr-8c6bd.appspot.com",
  messagingSenderId: "743597436785"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
