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
import db, { getRoom, addMessage } from './firebase';
import { ChatPlaceHolder } from './ChatPlaceHolder';
import { useStateValue } from './DataStore'
import { serverTimestamp, collection, query, orderBy, onSnapshot } from '@firebase/firestore';



const Chat = () => {
	const [input, setInput] = useState("");
	const [seed, setSeed] = useState("");
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState("");
	const [messages, setMessages] = useState([]);
	const [lastSeen, setLastSeen] = useState("")
	const [{ user }, ] = useStateValue()

	useEffect(() => {
		if (roomId) {
			const response = getRoom(db,roomId)
			response.then( data =>(
				setRoomName(data.name)
			)).catch( error => alert("Error Fetching Room. Try Again"))

			// const messagesResponse = getMessages(db,roomId)
			// messagesResponse.then(data=>{
			// 	const messages = data.docs.map(doc =>(doc.data()))
			// 	setMessages(messages);
			// }).catch(error=>{
			// 	console.error(error);
			// 	alert("Error fetching Messages Try Again Later!")
			// })
			const stateSetter= data => {
				setMessages(data)
				const lastMessage = data[data.length - 1]
				const lastSeen = lastMessage.timestamp === null? "": lastMessage.timestamp.toDate()
				setLastSeen(lastSeen)
			}

			const collectionRef =  collection(db, "rooms", roomId, "messages")
			const queryRef = query(collectionRef, orderBy("timestamp", "asc"))
			const unsub = onSnapshot(queryRef, (querySnapshot) => {
				if(querySnapshot.empty){
					const chatMessages= [{
						name: null,
						message: null,
						timestamp: null,
					}]
					stateSetter(chatMessages)
				}else{
					const chatMessages = querySnapshot.docs.map(doc =>(doc.data()))
					stateSetter(chatMessages)
				}
				
			});

			return ()=> {
				unsub()
			}
		}


	}, [roomId])
	
	useEffect(() => {
	 	setSeed(Math.floor(Math.random()*5000));
	}, [roomId]); 

	const sendMessage = (e) => {
		e.preventDefault();
		const message = {
			message: input,
			name: user,
			timestamp: serverTimestamp()
		}
		addMessage(db, roomId, message).catch(error=>console.error(error))
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
					<p>{`Last Seen on ${lastSeen}`}</p>
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
				<ChatPlaceHolder />
				{messages.map((message)=>(
					<p className={`chat__message ${message.name === user && "chat__receiver"}`}>
						<span className="chat__name">{message.name}</span>
						{message.message}
						<span className="chat__timestamp">{message.timestamp == null? "":
						new Date(message.timestamp.toDate()).toUTCString()}</span>
					</p>
				))
				}	
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
