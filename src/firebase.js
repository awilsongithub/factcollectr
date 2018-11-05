import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBnbP3WZssMHCMkDVz6_RV904XF3UGrwes",
  authDomain: "factcollectr-8c6bd.firebaseapp.com",
  databaseURL: "https://factcollectr-8c6bd.firebaseio.com",
  projectId: "factcollectr-8c6bd",
  storageBucket: "factcollectr-8c6bd.appspot.com",
  messagingSenderId: "743597436785"
};

firebase.initializeApp(config);
export default firebase;
