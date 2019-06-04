import React from "react";

class Form extends React.Component {
    render() {
        return (
            <form className="form" onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="City... (e.g. Munich)" required></input>
                <input type="text" name="country" placeholder="Country... (e.g. Germany)" required></input>
                <button>Get Weather</button>
            </form>
        )
    }
}

export default Form;