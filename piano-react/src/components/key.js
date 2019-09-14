import React from 'react';
import { sustain } from './note-sustain';
import { playNote, releaseNote } from './tone/play-note'

export default function Key(props) {
    return (
        <li
            className={props.className}
            onMouseDown={() => (sustain) ? playNote(props.note, '3n') : playNote(props.note, null)}
            onMouseUp={() => (sustain) ? null : releaseNote()}
        />
    )
}