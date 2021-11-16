import { ChatBar } from "./ChatBar";
import { MessagesContainer } from "./ChatMessagesContainer";

export const ChatContainer = () => {
    return (
        <div className="chatContainer">
            <MessagesContainer />
            <ChatBar />
        </div>
    )
}