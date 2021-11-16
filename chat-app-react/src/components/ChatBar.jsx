import { useState } from 'react';

export const ChatBar = () => {
    const [input, setInput] = useState('');
    return (        
        <input value={input} onInput={e => setInput(e.target.value)}/>
    )
}


