import React from 'react';
import { playNote, releaseNote } from './tone/play-note'

export default function Key(props) {
    return (
        <li
            className={props.className}
            onMouseDown={() => (props.sustain) ? playNote(props.note, '3n') : playNote(props.note, null)}
            onMouseUp={() => (props.sustain) ? null : releaseNote()}
        />
    )
}