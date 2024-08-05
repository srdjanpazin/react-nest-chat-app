import './MessagesPage.css';
import ChatPanel from "../components/ChatPanel";
import ChatsSidebar from "../components/ChatsSidebar";
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useEffect } from 'react';

export default function MessagesPage() {

	const { userId } = useUserContext()!;
	const { chatId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {

		if (! userId)
			navigate('/login');
	},
	[userId, navigate]);

	return (
		<div className="messages-page">
			{chatId && <ChatPanel />}
			<ChatsSidebar />
		</div>
	);
}
