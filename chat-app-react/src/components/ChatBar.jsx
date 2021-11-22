import { useState } from 'react';

export const ChatBar = (props) => {
    const [input, setInput] = useState('');

    const resetBar = (e) => {
        setInput('');
        e.target.value = input;
    }

    const submitMessage = (e) => {
        e.preventDefault();
        props.addMessage(input);
        resetBar(e);
    }

    return (
        <form className="chatBarContainer" onSubmit={e => submitMessage(e)}>
            <input id="chatBar" value={input} onInput={e => setInput(e.target.value)} />
            <input type="submit" htmlFor="chatBar" value="Submit" />
        </form>
    )
}


