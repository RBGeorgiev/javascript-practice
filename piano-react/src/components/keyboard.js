import React from 'react';
import Octave from './octave';

export default function Keyboard() {
    const pitchNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className="keyboard">
            {pitchNum.map(n => <Octave key={n} pitch={n} />)}
        </div>
    )
}