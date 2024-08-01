import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

type Message = {
	senderId: number;
	content: string;
	createdAt: Date;
};

export default function ChatPanel() {

	const { chatId } = useParams();

	const GET_MESSAGES = gql`
		query GetMessages($chatId: Int!) {
			messages(chatId: $chatId)
		}
	`;

	const { data } = useQuery(GET_MESSAGES, { variables: { chatId }});

	return (
		<div>
			{ data && data.map(({ senderId, content, createdAt }: Message) => {
				return <div>{content}</div>;
			})}
		</div>
	);
}
