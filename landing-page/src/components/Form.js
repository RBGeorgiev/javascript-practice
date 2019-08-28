import React from "react";
import DatePicker from 'react-date-picker';

class Form extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000/*ms*/ * 60/*sec*/ * 60/*min*/ * 24/*hour*/ * 7/*day*/)
    }

    setStartDate = startDate => this.setState({ startDate })
    setEndDate = endDate => this.setState({ endDate })

    onSubmit(e) {
        e.preventDefault();
        alert("Thank you for submitting the form. We will get in touch with you as soon as possible.");
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div id="contact-info">
                    <label>Name <input type="text" name="name" required></input></label>
                    <label className="style-right">Email <input type="email" name="email" required></input></label>
                </div >

                <div id="dates">
                    <label htmlFor="start">Start date </label>
                    <DatePicker
                        id="start"
                        format="dd-MM-y"
                        value={this.state.startDate}
                        minDate={new Date()}
                        onChange={this.setStartDate}
                        required
                    />

                    <label className="style-right" htmlFor="end">End date </label>
                    <DatePicker
                        id="end"
                        format="dd-MM-y"
                        value={this.state.endDate}
                        minDate={this.state.startDate}
                        onChange={this.setEndDate}
                        required
                    />
                </div>

                <label htmlFor="message">Message </label>
                <textarea id="message" name="message"></textarea>

                <button>Send</button>
            </form >
        );
    }
}

export default Form;