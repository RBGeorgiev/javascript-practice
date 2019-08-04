import React from 'react';
import Container from 'react-bootstrap/Container';

const availableSizes = ['XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'];

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
                <Container>
                    <h4 className="title">Sizes: </h4>
                    {this.createCheckboxes()}
                </Container>
            </div>
        );
    }
}

export default Filter;