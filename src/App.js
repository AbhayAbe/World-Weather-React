import React, { Component } from "react";
import "./App.css";
import Weather from "./components/weather";
import { Helmet } from "react-helmet";
const TITLE = "Weather";
class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Weather />
      </div>
    );
  }
}

export default App;
