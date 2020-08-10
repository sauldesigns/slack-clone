import React, { useState } from 'react';
import './ChatInput.css';
import db from '../services/firebase';
import firebase from 'firebase';
import { useStateValue } from '../provider/StateProvider';

function ChatInput({ channelName, channelId }) {
	const [input, setInput] = useState('');
	const [{ user }] = useStateValue();

	const sendMessage = (e) => {
		e.preventDefault();
		if (channelId) {
			db.collection('rooms').doc(channelId).collection('messages').add({
				message: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				user: user.displayName,
				userImage: user.photoURL,
			});
			setInput('');
		}
	};

	return (
		<div className='chatInput'>
			<form onSubmit={sendMessage}>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message #${channelName}`}
				/>
			</form>
		</div>
	);
}

export default ChatInput;
