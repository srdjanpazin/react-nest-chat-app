import { useUserContext } from '../context/UserContext';
import './MessageBubble.css';

type MessageBubbleProps = {
	senderId: string;
	content: string;
}

export default function MessageBubble({ content, senderId }: MessageBubbleProps) {

	const { userId } = useUserContext()!;
	const className = userId === senderId ? 'msg-blue' : 'msg-grey';

	return (
		<div className="message-row">
			<div className={'message-bubble ' + className}>
				{content}
			</div>
		</div>
	);
}