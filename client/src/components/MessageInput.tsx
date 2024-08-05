import './MessageInput.css';
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useUserContext } from '../context/UserContext';

const POST_MESSAGE_MUTATION = gql`
	mutation PostMessage($messageData: MessageInput!) {
		postMessage(messageData: $messageData) {
			senderId
			content
		}
	}
`;

export default function MessageInput() {

	const [message, setMessage] = useState('');
	const { userId } = useUserContext()!;
	const [ postMessage ] = useMutation(POST_MESSAGE_MUTATION);

	function handleMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
		setMessage(event.target.value);
	}

	async function sendMessage() {

		if (! message) return;

		try {
			const { data } = await postMessage({ variables: { 
				messageData: { chatId: 1, senderId: userId, content: message }
			}});

			setMessage('');
		}
		catch (error) {
			console.error('Error sending message:', error);
		}
	}

	return (
		<div className="chat-input-cont">
			<input type="text" className="chat-input-fld" value={message} onChange={handleMessageChange} />
			<button onClick={sendMessage}>Send</button>
		</div>
	)
}
