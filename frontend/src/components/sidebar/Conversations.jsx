import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
import {getRandomEmoji} from "../../utils/emojis";

const Conversations = () => {

	const {loading, conversations} = useGetConversation();
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{
				conversations.map((conversation, idx) => (
					<Conversation 
						key={conversation._id}
						conversation = {conversation}
						emoji = {getRandomEmoji()}
						lastIdx = {idx === conversation.length - 1}
					/>
				))
			}
		</div>
	);
};
export default Conversations;