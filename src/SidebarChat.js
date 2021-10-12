import React,{ useState,useEffect } from 'react';
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';
import db,{ addRoom } from './firebase.js';
import { Link } from 'react-router-dom';
import { collection, orderBy,query, onSnapshot } from '@firebase/firestore';


function SidebarChat({id, name, addNewChat}) {
	const [seed, setSeed] = useState("");
	const [lastMessage, setLastMessage] = useState("")

	const stateSetter = data => {
		const lastMessageObject = data[data.length - 1];
		const { message } = lastMessageObject; 
		setLastMessage(message)
	}

	useEffect(() => {
		setSeed(Math.floor(Math.random()*5000));
	}, []);

	useEffect(() => {
		if(id){
			const collectionRef =  collection(db, "rooms", id, "messages")
			const queryRef = query(collectionRef, orderBy("timestamp", "asc"))
			const unsub = onSnapshot(queryRef, (querySnapshot) => {
				if(querySnapshot.empty){
					const chatMessages = [{
						name:"",
						message:"",
						timestamp: "",
					}]
					stateSetter(chatMessages)
				}else{
					const chatMessages = querySnapshot.docs.map(doc =>(doc.data()))
					stateSetter(chatMessages)
				}
				
			});

			return ()=> unsub()
		}
	}, [id])
	
	const createChat = () => {
		const roomName = prompt("Kindly Enter The Chat Room Name");

		if (roomName) {
			const docRef = addRoom(db,roomName)
			docRef.then(response =>{
				console.log("Success")
			}).catch(error=>{
				alert("Error!!!")
			})
		}
	}

	return !addNewChat ? (
			<Link to={`/rooms/${id}`}>
				<div className="sidebarChat">
					<Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
					<div className="sidebarChat__info">
						<h2>{name}</h2>
						<p>{lastMessage}</p>
					</div>
				</div>
			</Link>
	) : (<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
	</div>)
}

export default SidebarChat;