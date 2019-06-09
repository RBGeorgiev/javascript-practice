import React from "react";

const Form = () => (
    <form>
        <div id="contact-info">
            <label>Name <input type="text" name="name" required></input></label><br></br>
            <label>Email <input type="email" name="email" required></input></label>
        </div >
        <div id="dates">
            <label for="start">Start date <input type="date" id="start" name="start-date"
                value="2019-07-22"
                min="2019-07-01" max="2019-12-31" required></input>
            </label>

            <label for="end">End date <input type="date" id="end" name="end-date"
                value="2019-07-26"
                min="2019-07-01" max="2019-12-31" required></input>
            </label>
        </div>
        <label for="message">Message </label>
        <textarea id="message" name="message"></textarea>
        <button>Send</button>
    </form>
);

export default Form;