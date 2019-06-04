import React from "react";

const Form = (props) => (
    <form className="form" onSubmit={props.getWeather}>
        <input type="text" name="city" placeholder="City... (e.g. Munich)" required></input>
        <input type="text" name="country" placeholder="Country... (e.g. Germany)" required></input>
        <button>Get Weather</button>
    </form>
)

export default Form;