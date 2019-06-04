import React from "react";

class Weather extends React.Component {
    render() {
        return (
            <div>
                {(this.props.city && this.props.country) ? <p>City: {this.props.city}, {this.props.country}</p> : ''}
                {this.props.temperature ? <p>Temperature: {this.props.temperature} celsius</p> : ''}
                {(this.props.minTemp && this.props.maxTemp) ? <p>Min temp: {this.props.minTemp}, Max temp: {this.props.maxTemp}</p> : ''}
                {this.props.humidity ? <p>Humidity: {this.props.humidity}</p> : ''}
                {(this.props.condition && this.props.description) ? <p>Condition: {this.props.condition}, {this.props.description}</p> : ''}
                {this.props.error ? <p>{this.props.error}</p> : ''}
            </div>
        )
    }
}

export default Weather;