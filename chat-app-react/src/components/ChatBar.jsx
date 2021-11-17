import { useState } from 'react';

export const ChatBar = () => {
    const [input, setInput] = useState('');
    return (        
        <input className="chatBar" value={input} onInput={e => setInput(e.target.value)}/>
    )
}


