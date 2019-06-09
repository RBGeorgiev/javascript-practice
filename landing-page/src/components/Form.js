import React from "react";

const Form = () => (
    <form>
        <label>Name:<input type="text" name="name" required></input></label>
        <label>Email:<input type="text" name="email" required></input></label>

        <div id="dates">
            <label for="start">Start date:</label>
            <input type="date" id="start" name="start-date"
                value="2019-07-22"
                min="2019-07-01" max="2019-12-31"></input>

            <label for="end">End date:</label>
            <input type="date" id="end" name="end-date"
                value="2019-07-26"
                min="2019-07-01" max="2019-12-31"></input>
        </div>

        <label>Message:<textarea type="text" name="message"></textarea></label>
        <button>Send</button>
    </form>
);

export default Form;