import React from 'react';
import { synth } from './tone-config';
import { sustain } from './note-sustain';

function playNote(note, duration) {
    if (duration === null) {
        synth.triggerAttack(note);
    } else {
        synth.triggerAttackRelease(note, duration);
    }
}

function releaseNote() {
    synth.triggerRelease();
}

export default function Key(props) {
    return (
        <li
            className={props.className}
            onMouseDown={() => (sustain) ? playNote(props.note, '3n') : playNote(props.note, null)}
            onMouseUp={() => (sustain) ? null : releaseNote()}
        />
    )
}