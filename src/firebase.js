import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDZlbOeZfAb4n_bpUabp7ynvPDAt8KjmYs",
    authDomain: "whatsapp-clone-f5d3b.firebaseapp.com",
    projectId: "whatsapp-clone-f5d3b",
    storageBucket: "whatsapp-clone-f5d3b.appspot.com",
    messagingSenderId: "399913419460",
    appId: "1:399913419460:web:48ab94a29137a1b4b4ff91"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth, provider};
  export default db ;