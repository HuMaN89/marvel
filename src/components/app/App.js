import "./App.scss";
import Header from "../header/Header";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";

import image from "../../img/vision.png";
import Banner from "../banner/Banner";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import { Component } from "react";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {
  state = {
    selectedChar: null,
  };
  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };
  render() {
    return (
      <div className="app">
        <Header />
        <main>
          <RandomChar />
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charID={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={image} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
