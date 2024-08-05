import { gql, useQuery, useSubscription } from '@apollo/client';
import './MessagesView.css';
import { useParams } from 'react-router-dom';
import MessageBubble from './MessageBubble';
import { useRef } from 'react';

type Message = {
	senderId: string;
	content: string;
	createdAt: Date;
};

const GET_MESSAGES = gql`
	query GetMessages($chatId: Int!) {
		messages(chatId: $chatId) {
			senderId
			content
			createdAt
		}
	}
`;

const MESSAGE_SUBSCRIPTION = gql`
	subscription {
		messageAdded {
			chatId
			senderId
			content
			createdAt
		}
	}
`;

export default function MessagesView() {

	const { chatId } = useParams();
	const newMessagesList = useRef<any[]>([]);

	const { data, loading, error } = useQuery(GET_MESSAGES, { variables: { chatId: Number(chatId) }});
	const { data: subData, loading: subLoading, error: subError  } = useSubscription(MESSAGE_SUBSCRIPTION);

	if (loading)
		return <p>Loading...</p>;

	if (error) {
		console.error(error);
		return <p>Error</p>;
	}

	// newMessagesList.current = Array.from(data.messages);

	if (subError)
		console.error(subError);
	else if (! subLoading)
		newMessagesList.current.push(subData.messageAdded);

	return (
		<div className="messages-cont">
			{ data && data.messages.map(({ senderId, content, createdAt }: Message) => {
				return <MessageBubble content={content} senderId={senderId} />
			})}
			{ newMessagesList.current.map(({ senderId, content, createdAt }: Message) => {
				return <MessageBubble content={content} senderId={senderId} />
			})}
		</div>
	);
}
