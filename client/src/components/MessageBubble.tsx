import { useUserContext } from '../context/UserContext';
import './MessageBubble.css';

type MessageBubbleProps = {
	senderId: string;
	content: string;
}

export default function MessageBubble({ content, senderId }: MessageBubbleProps) {

	const { userId } = useUserContext()!;
	const isCurrUserMsg = userId === senderId;

	return (
		<div className={'message-row ' + (isCurrUserMsg ? 'msg-right' : '')}>
			<div className={'message-bubble ' + (isCurrUserMsg ? 'msg-blue' : 'msg-grey')}>
				{content}
			</div>
		</div>
	);
}