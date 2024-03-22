// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB5NgunkPi8YMqlqI9fN1Zu9pDJVJg0H54',
  authDomain: 'persistentown.firebaseapp.com',
  projectId: 'persistentown',
  storageBucket: 'persistentown.appspot.com',
  messagingSenderId: '749310898949',
  appId: '1:749310898949:web:2e2b46de5ad5e24c093d6c',
  measurementId: 'G-JRSQ1RPEXQ',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };

// TODO remove this eventually
// logs some stuff to the dev tools console to ensure firebase is working and whatknot
export async function testFirebaseStuff() {
  // if projectId is 'persisTown', then you're succesfully connected
  console.log(firebaseApp.options.projectId);
  // test reading from the database - should read value 'zachswagmoney'
  const querySnapshot = await getDocs(collection(db, 'test_collection'));
  querySnapshot.forEach(doc => {
    console.log(doc.data());
  });
}
