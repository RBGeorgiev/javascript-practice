import React from 'react';
import { connect } from 'react-redux';
import { updateFilters } from '../store/update-filters'
import { updateOrder } from '../store/update-order'
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

    handleOrderChange = (e) => {
        this.props.updateOrder(e.target.value);
    }

    render() {
        return (
            <Container className="filters">
                <div>
                    -- product(s) found
                </div>
                <div>
                    <h4 className="title">Sizes:</h4>
                    {this.createCheckboxes()}
                </div>
                <div>
                    <select onChange={this.handleOrderChange}>
                        <option key="default" value="default" defaultValue>Order by Price</option>
                        <option key="low-to-high" value="low-to-high">Lowest to Highest</option>
                        <option key="high-to-low" value="high-to-low">Highest to Lowest</option>
                    </select>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps, { updateFilters, updateOrder })(Filter);