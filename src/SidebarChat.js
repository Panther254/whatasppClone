import React,{ useState,useEffect } from 'react';
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';
import db,{ addRoom } from './firebase.js';
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNewChat}) {
	const [seed, setSeed] = useState("");

	useEffect(() => {
		setSeed(Math.floor(Math.random()*5000));
	}, []);
	
	const createChat = () => {
		const roomName = prompt("Kindly Enter The Chat Room Name");

		if (roomName) {
			const docRef = addRoom(db,roomName)
			docRef.then(response =>{
				alert(`room ${response.id} has been added`)
				window.location.reload()
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
					<p>Last Message...</p>
				</div>
			</div>
		</Link>
	) : (<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
	</div>)
}

export default SidebarChat;