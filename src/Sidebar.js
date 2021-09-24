import React from 'react';
import './Sidebar.css';
import Avatar from '@mui/material/Avatar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SidebarChat from './SidebarChat.js';



const Sidebar = () => {
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
				<SidebarChat />
				<SidebarChat />
				<SidebarChat />
				<SidebarChat />
			</div>
		</div>
	)
}

export default Sidebar;