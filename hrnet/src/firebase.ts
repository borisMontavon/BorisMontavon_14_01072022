import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEucfGMHWpRFSQlLMMjuSZ7x0lUj5ig9w",
    authDomain: "hrnet-b3a78.firebaseapp.com",
    projectId: "hrnet-b3a78",
    storageBucket: "hrnet-b3a78.appspot.com",
    messagingSenderId: "972561492085",
    appId: "1:972561492085:web:e9f0c8a594b4e43b7f703c"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);

export default database;
