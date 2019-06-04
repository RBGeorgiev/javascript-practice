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
    minTemp: undefined,
    maxTemp: undefined,
    humidity: undefined,
    condition: undefined,
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

    try {
      this.setState({
        city: DATA.name,
        country: DATA.sys.country,
        temperature: DATA.main.temp,
        minTemp: DATA.main.temp_min,
        maxTemp: DATA.main.temp_max,
        humidity: DATA.main.humidity,
        condition: DATA.weather[0].main,
        description: DATA.weather[0].description,
        error: undefined,
      })
    } catch (error) {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        minTemp: undefined,
        maxTemp: undefined,
        humidity: undefined,
        condition: undefined,
        description: undefined,
        error: DATA.message,
      })
    }
  }

  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          minTemp={this.state.minTemp}
          maxTemp={this.state.maxTemp}
          humidity={this.state.humidity}
          condition={this.state.condition}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;