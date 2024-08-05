import './ChatPanel.css';
import MessagesView from './MessagesView';
import MessageInput from './MessageInput';

export default function ChatPanel() {

	return (
		<div className="chat-panel">
			<MessagesView />
			<MessageInput />
		</div>
	);
}
