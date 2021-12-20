import { useState, useRef } from "react";

export const ChatBar = (props) => {
    const [input, setInput] = useState("");
    const chatBarInput = useRef(null);

    const resetBar = (e) => {
        setInput("");
        e.target.value = input;
        chatBarInput.current.focus();
    };

    const submitMessage = (e) => {
        e.preventDefault();
        props.addMessage(input);
        resetBar(e);
    };

    return (
        <form className="chatBarContainer" onSubmit={(e) => submitMessage(e)}>
            <input
                id="chatBar"
                ref={chatBarInput}
                value={input}
                onInput={(e) => setInput(e.target.value)}
                placeholder="Message"
            />
            <input type="submit" htmlFor="chatBar" value="Submit" />
        </form>
    );
};
