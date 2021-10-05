import React,{ useEffect, useState } from 'react';
import './Sidebar.css';
import Avatar from '@mui/material/Avatar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SidebarChat from './SidebarChat.js';
import db,{ getRooms } from './firebase.js';



const Sidebar = () => {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		const roomsSnapshot = getRooms(db)
		roomsSnapshot
		.then(snapshot=>{ 
			const roomList = snapshot.docs.map(doc=>({ id: doc.id, name: doc.data()}))
			roomList.forEach(element => {
				const id  = element.id
				const name = element.name.name
				setRooms( rooms=>[...rooms,{ id: id, name: name },])
			});
		})
		.catch(error=>(
			console.log("Error!!", error)
		))
	}, [])

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<IconButton>
					<Avatar />
				</IconButton>
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>	
				</div>
			</div>
			
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<input type="text" placeholder="Search or start a new Chat" />
				</div>			
			</div>
			
			<div className="sidebar__chats">
				<SidebarChat addNewChat />
				{rooms.map(room=>(<SidebarChat key={room.id} id={room.id} name={room.name} />))}
			</div>
		</div>
	)
}

export default Sidebar;