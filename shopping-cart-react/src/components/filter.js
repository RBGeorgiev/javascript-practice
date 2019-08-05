import React from 'react';
import { connect } from 'react-redux';

const availableSizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
];

class Filter extends React.Component {
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
                <p>{this.props.items}</p>
                <h4 className="title">Sizes:</h4>
                {this.createCheckboxes()}
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps)(Filter);