import React from "react";

class Weather extends React.Component {
    render() {
        return (
            <div className="weather">
                {(this.props.city && this.props.country) ? <p className="largeFont">{this.props.city}, {this.props.country}</p> : ''}
                {this.props.temperature ? <p className="largeFont tempFont">{this.props.temperature}°C</p> : ''}
                {(this.props.minTemp && this.props.maxTemp) ? <p>{this.props.minTemp}°C / {this.props.maxTemp}°C</p> : ''}
                {this.props.condition ? <p className="largeFont">{this.props.condition}</p> : ''}
                {this.props.description ? <p>{this.props.description}</p> : ''}
                {this.props.humidity ? <p>Humidity: {this.props.humidity}%</p> : ''}
                {this.props.error ? <div><p className="largeFont">{this.props.error}</p><p>Please check if both the city and country have been entered correctly.</p></div> : ''}
            </div>
        )
    }
}

export default Weather;