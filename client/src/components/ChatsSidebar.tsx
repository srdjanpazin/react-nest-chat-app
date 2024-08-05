import './ChatsSidebar.css';
import { gql, useQuery } from '@apollo/client';
import { useUserContext } from '../context/UserContext';

type ChatInfo = {
	uuid: number;
	participants: UserData[];
	lastMsg: string;
	lastMsgTime: number;
}

type UserData = {
	_id: string;
	name: string;
}

export default function ChatsSidebar() {

	const { userId } = useUserContext()!;
	let htmlContent;

	const GET_CHATS = gql`
		query GetChats($userId: String!) {
			chats(userId: $userId) {
				uuid
				participants {
					_id
					name
				}
			}
		}
	`;

	// const GET_USERS = gql`
	// 	query GetUsers($userIds: [String!]!) {
	// 		users(userIds: $userIds) {
	// 			_id
	// 			name
	// 		}
	// 	}
	// `;

	const { loading, error, data } = useQuery(GET_CHATS, { variables: { userId }});

	if (! userId)
		return <></>;

	if (loading) {
		htmlContent = <p>Loading...</p>;
	}
	else if (error) {
		htmlContent = <p>Error {error.message}</p>;
	}
	else { // data is available
		//const usersToFetchSet = new Set();

		// Fetch user data for each participant in each current user's chat
		// data.chats.forEach(({ participants }: ChatInfo) => {
		// 	const index = participants.indexOf(userId);
		// 	participants.splice(index, 1);

		// 	participants.forEach(_userId => usersToFetchSet.add(_userId));
		// });

		// const { userData } = useQuery(GET_USERS);

		htmlContent = data.chats.map(({ uuid, participants }: ChatInfo) => {

			const index = participants.findIndex(user => user._id === userId);
			participants.slice(index, 1);

			return <div data-chat-id={uuid}>
				<h4>{participants[0].name}</h4>
			</div>;
		});
	}

	return (
		<div className="chats-sidebar">
			<h3>Chats</h3>
			{htmlContent}
		</div>
	);
}
