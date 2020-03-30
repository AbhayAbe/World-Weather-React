import React, { Component } from "react";
import Snowfall from "react-snowfall";
import ReactRain from "react-rain-animation";
class Weather extends Component {
  state = {
    checkInt: false,
    weather: "undefined",
    temp: 0,
    found: false,
    tval: "",
    stat: "",
    country: ""
  };

  getInput = inpData => {
    this.setState({ checkInt: false });
    console.log("msg: ", this.state.weather.message);
    const api_key = "2a2388d3fa0d2ea6fe505bb7f393f69d";
    const url_base = "https://api.openweathermap.org/data/2.5/";
    console.log(typeof this.state.weather);
    if (inpData.keyCode == 13) {
      console.log("value", inpData.target.value);

      fetch(
        `${url_base}weather?q=${inpData.target.value}&units=metric&APPID=${api_key}`
      )
        .then(result => {
          result.json().then(resp => {
            console.log(resp);

            this.setState({ weather: resp });

            console.log("resp:::: ", this.state.weather);
            if (this.state.weather.message == "city not found") {
              this.setState({ weather: "undefined" });
              this.setState({ temp: 0 });
              this.setState({ tval: "" });
              this.setState({ found: false });
              this.setState({ stat: "" });
              this.setState({ country: "" });
            } else {
              this.setState({ temp: resp.main.temp });
              this.setState({ found: true });
              this.setState({ tval: resp.main.temp.toString() });
              this.setState({ stat: this.state.weather.weather[0].main });
              console.log("countryName: ", this.state.weather.sys.country);
              if (this.state.weather.sys.country) {
                this.setState({
                  country: ", " + this.state.weather.sys.country
                });
              } else this.setState({ country: "" });
            }
          });
        })
        .catch(error => {
          console.error("Error:", error);
          this.setState({ checkInt: true });
          this.setState({ weather: "undefined" });
          this.setState({ temp: 0 });
          this.setState({ found: false });
          this.setState({ stat: "" });
          this.setState({ country: "" });
        });
    }
  };

  render() {
    let today = new Date();

    return (
      <div
        id="app"
        className={
          this.state.found == true && this.state.temp > 20 ? "warm" : "cold"
        }
      >
        <div id="condDetect" className={this.state.stat}>
          {this.state.stat == "Snow" ? <Snowfall /> : ""}

          <main>
            <div className="Searchbox">
              <input
                type="text"
                onKeyDown={this.getInput}
                className="searchbar"
                placeholder="Search..."
              ></input>
            </div>
            <div className="WeatherReport">
              {this.state.checkInt === false
                ? ""
                : "Please check your internet connection!"}
              <div className="location">
                {this.state.weather != "undefined"
                  ? this.state.weather.name + this.state.country
                  : ""}
              </div>
              <div className="temp">
                {this.state.found == true
                  ? Math.round(this.state.tval) + "°c"
                  : ""}
              </div>
              <div className="status">
                {this.state.found == true ? this.state.stat : ""}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
export default Weather;
