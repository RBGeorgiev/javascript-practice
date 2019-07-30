import React, { Component } from 'react';

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

class Filter extends Component {

    createCheckbox = label => (
        <div className='checkboxes'>
            <label>
                <input type="checkbox" value={label} />
                <span className="checkmark">{label}</span>
            </label>
        </div>
    );

    createCheckboxes = () => availableSizes.map(this.createCheckbox);

    render() {
        return (
            <div className="filters">
                <h4 className="title">Sizes:</h4>
                {this.createCheckboxes()}
            </div>
        );
    }
}

export default Filter