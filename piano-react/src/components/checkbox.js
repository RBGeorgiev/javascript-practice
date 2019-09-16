import React from 'react';

export default function Checkbox(props) {
    return (
        <label className='checkboxContainer'>
            {props.label}
            <input
                type="checkbox"
                defaultChecked={props.sustain}
                onChange={props.onChange}
            />
            <span className='checkmark'></span>
        </label>
    );
}