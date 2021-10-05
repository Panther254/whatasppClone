import React,{ useEffect,useState } from 'react';
import './Chat.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router';
import db, { getRoom } from './firebase';



const Chat = () => {
	const [input, setInput] = useState("");
	const [seed, setSeed] = useState("");
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState("");

	useEffect(() => {
		if (roomId) {
			const response = getRoom(db,roomId)
			response.then( data =>(
				// console.log("data is here",data)
				setRoomName(data.name)
			)).catch( error => alert("Error Fetching Room. Try Again"))
			// setRoomName(data)
		}
	}, [roomId])
	
	useEffect(() => {
	 	setSeed(Math.floor(Math.random()*5000));
	 }, [roomId]); 

	const sendMessage = (e) => {
		e.preventDefault();
		console.log("You typed:", input);
		setInput("");
	}

	const handleChange = (e) => {
		setInput(e.target.value);
	}

	return (
		<div className="chat">
			<div className="chat__header">
				<IconButton>
					<Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
				</IconButton>
				
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>Last Seen at...</p>
				</div>
				
				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFileOutlinedIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>	
				</div>
			</div>
			
			<div className="chat__body">
				<p className={`chat__message ${true && "chat__receiver"}`}>
					<span className="chat__name">Hanningtone</span>
					Hey guys
					<span className="chat__timestamp">4:05pm</span>
				</p>
			</div>
			
			<div className="chat__footer">
				<IconButton>
					<InsertEmoticonIcon />
				</IconButton>
				<form>
					<input placeholder="Type a Message" type="text" value={input} onChange={handleChange}/>
					<button type="submit" onClick={sendMessage}>Send Message</button>
				</form>
				<IconButton>
					<MicIcon />
				</IconButton>
			</div>
		</div>
)}

export default Chat;
