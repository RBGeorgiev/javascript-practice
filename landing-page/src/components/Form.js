import React from "react";

class Form extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        alert("Thank you for submitting the form. We will get in touch with you as soon as possible.");
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div id="contact-info">
                    <label>Name <input type="text" name="name" required></input></label>
                    <label class="style-right">Email <input type="email" name="email" required></input></label>
                </div >

                <div id="dates">
                    <label for="start">Start date </label>
                    <input type="date" id="start" name="start-date"
                        value="2019-07-22"
                        min="2019-07-01" max="2019-12-31" required></input>

                    <label class="style-right" for="end">End date </label>
                    <input type="date" id="end" name="end-date"
                        value="2019-07-26"
                        min="2019-07-01" max="2019-12-31" required></input>
                </div>

                <label for="message">Message </label>
                <textarea id="message" name="message"></textarea>

                <button>Send</button>
            </form >
        );
    }
}

export default Form;