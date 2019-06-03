import React from "react";

import { API_KEY } from './components/Constants';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

class App extends React.Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }

  getWeather = async (e) => {
    e.preventDefault();
    const CITY = e.target.city.value;
    const COUNTRY = e.target.country.value;
    const API_CALL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`);
    const DATA = await API_CALL.json();

    console.log(DATA);

    this.setState({
      city: DATA.name,
      country: DATA.sys.country,
      temperature: DATA.main.temp,
      humidity: DATA.main.humidity,
      description: DATA.weather[0].description,
      error: undefined,
    })
  }

  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather />
      </div>
    );
  }
}

export default App;