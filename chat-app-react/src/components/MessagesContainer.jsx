import { Message } from "./Message";

export const MessagesContainer = (props) =>
    <div className="messagesContainer">
        {props.messages.map((text, idx) => <Message key={idx} text={text} />)}
    </div>
