import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";






// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHLGJDoRMtGG3JxZnjei7g_rBHrCcplpk",
  authDomain: "clone-64c67.firebaseapp.com",
  projectId: "clone-64c67",
  storageBucket: "clone-64c67.appspot.com",
  messagingSenderId: "659816473135",
  appId: "1:659816473135:web:013e95883be2b498fe5cda",
  measurementId: "G-G57WEN2BHW"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// Get a list of rooms from the database
async function getRooms(db) {
  const rooms = collection(db, 'rooms')
  const roomsSnapshot = await getDocs(rooms)
  const roomList = roomsSnapshot.docs.map(doc =>({ id: doc.id, name: doc.data() }));
  return roomList
}

export { auth,provider,getRooms };
export default db;