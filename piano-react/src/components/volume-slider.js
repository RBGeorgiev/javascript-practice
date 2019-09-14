import React from 'react';
import changeVol from './tone/change-volume'

export default function VolumeSlider() {
    let handleChange = (e) => {
        changeVol(e.target.value);
    }

    return (
        <div className='volumeController'>
            <label>Volume</label>
            <input
                className='volumeSlider'
                type="range"
                min="-35" max="15"
                defaultValue='0'
                onChange={handleChange}
                step="1"
            />
        </div>
    );
}