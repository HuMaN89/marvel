import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import "./style/style.scss";
// import MarvelService from "./services/MarvelService";
import App from "./components/app/App";

// const marvelService = new MarvelService();
// marvelService.getRandomCharacter().then((res) => console.log(res));
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
