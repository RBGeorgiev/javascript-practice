import React from 'react';
import { connect } from 'react-redux';
import { updateFilters } from '../store/update-filters'
import Container from 'react-bootstrap/Container';

const availableSizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
];

class Filter extends React.Component {
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
        < div key={label} className='checkbox-container' >
            <label>
                <input type="checkbox" value={label} onChange={this.handleInputChange} />
                <span className="checkmark">{label}</span>
            </label>
        </div>
    );

    createCheckboxes = () => availableSizes.map(this.createCheckbox);

    render() {
        return (
            <Container className="filters">
                <div>
                    <h4 className="title">Sizes:</h4>
                    {this.createCheckboxes()}
                </div >
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps, { updateFilters })(Filter);