import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, query, orderBy } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "fgfd4$tyrrtrtr6576t7uiggAfdfdZGREsrfA78YHJHXyt",
  authDomain: "whatsapp-clone-da6ae.firebaseapp.com",
  projectId: "whatsapp-clone-da6ae",
  storageBucket: "whatsapp-clone-da6ae.appspot.com",
  messagingSenderId: "230197611611",
  appId: "1:230197611611:web:15544944e4782e5f04437e",
  measurementId: "G-668JYFKFYK"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// Get a list of rooms from the database
async function getRooms(db) {
  const rooms = collection(db, 'rooms')
  const roomsSnapshot = await getDocs(rooms)
  return roomsSnapshot
}

//Fetch room with id
const getRoom = async(db, roomId)=>{
  const docRef = doc(db, "rooms", roomId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    alert("No such document!");
  }
}

// Add a new document with a generated id.
const addRoom = async(db, name)=>{
  const docRef = await addDoc(collection(db, "rooms"), {
    name: name,
  });
  return docRef
};


const addMessage = async(db, roomId, message)=>{
  const docRef = await addDoc(collection(db, "rooms", roomId, "messages"), message)
  return docRef
};

const getMessages = async(db, roomId) =>  {
  const collectionRef =  collection(db, "rooms", roomId, "messages")
  const queryRef = query(collectionRef, orderBy("timestamp", "asc"))
  const messageSnapshot = await getDocs(queryRef)
  return messageSnapshot
}

export { auth, provider, getRooms, addRoom, getRoom, addMessage, getMessages };
export default db;