import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useUserContext } from './UserContext';

type ChatInfo = {
	name: string;
	lastMsg: string;
	lastMsgTime: number;
}

export default function ContactsSidebar() {

	const { userId } = useUserContext()!;
	let htmlContent;

	const GET_CHATS = gql`
		query GetChats($userId: Int!) {
			chats(userId: $userId)
		}
	`;

	const { loading, error, data } = useQuery(GET_CHATS, { variables: { userId }});

	if (loading) {
		htmlContent = <p>Loading...</p>;
	}
	else if (error) {
		htmlContent = <p>Error {error.message}</p>;
	}
	else { // data is available
		htmlContent = data.chats.map(({ name, lastMsg, lastMsgTime }: ChatInfo) => (
			<div>
				<h4>{name}</h4>
			</div>
		));
	}

	return (
		<div className="contacts-sidebar">
			<h3>Chats</h3>
			{htmlContent}
		</div>
	);
}
