import React,{ useState,useEffect } from 'react';
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';

function SidebarChat({addNewChat}) {
	const [seed, setSeed] = useState("");

	useEffect(() => {
		setSeed(Math.floor(Math.random()*5000));
	}, []);
	
	const createChat = () => {
		const roomName = prompt("Kindly Enter The Chat Name");

		if (roomName) {
			//Do some Stuff
		}
	}

	return !addNewChat ? (
		<div className="sidebarChat">
			<Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
			<div className="sidebarChat__info">
				<h2>Room Name</h2>
				<p>Last Message...</p>
			</div>
		</div>
	) : (<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
	</div>)
}

export default SidebarChat;