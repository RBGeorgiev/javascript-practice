import React from 'react';

export let sustain = true;

export default function NoteSustainCheckbox() {
    return (
        <label className='checkboxContainer'>
            Enable fixed note duration
            <input
                type="checkbox"
                defaultChecked={sustain}
                onChange={() => sustain = !sustain}
            />
            <span className='checkmark'></span>
        </label>
    );
}