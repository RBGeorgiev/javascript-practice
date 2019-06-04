import React from "react";

const Weather = (props) => (
    <div className="weather">
        {(props.city && props.country) ? <p className="largeFont">{props.city}, {props.country}</p> : ''}
        {props.temperature ? <p className="largeFont tempFont">{props.temperature}°C</p> : ''}
        {(props.minTemp && props.maxTemp) ? <p>{props.minTemp}°C / {props.maxTemp}°C</p> : ''}
        {props.condition ? <p className="largeFont">{props.condition}</p> : ''}
        {props.description ? <p>{props.description}</p> : ''}
        {props.humidity ? <p>Humidity: {props.humidity}%</p> : ''}
        {props.error ? <div><p className="largeFont">{props.error}</p><p>Please check if both the city and country have been entered correctly.</p></div> : ''}
    </div>
)

export default Weather;