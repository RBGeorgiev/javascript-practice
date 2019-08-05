import React from 'react';
import { connect } from 'react-redux';
import { updateFilters } from '../store/update-filters'

const availableSizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
];

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGoing: false,
            numberOfGuests: 2
        };
    }

    componentDidMount() {
        this.selectedCheckboxes = new Set();
    }

    handleInputChange = e => {
        const val = e.target.value

        if (this.selectedCheckboxes.has(val)) {
            this.selectedCheckboxes.delete(val);
        } else {
            this.selectedCheckboxes.add(val);
        }

        this.props.updateFilters(Array.from(this.selectedCheckboxes));
    }


    createCheckbox = label => (
        <div className='checkboxes'>
            <label>
                <input type="checkbox" value={label} checked={this.state.checked} onChange={this.handleInputChange} />
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
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps, { updateFilters })(Filter);