import "./App.scss";
import Header from "../header/Header";
// import RandomChar from "../randomChar/RandomChar";
// import CharList from "../charList/CharList";
// import image from "../../img/vision.png";
// import Banner from "../banner/Banner";
import ComicsList from "../comicsList/ComicsList";
// import SingleComic from "../singleComic/SingleComic";
import { useState } from "react";
// import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };
  return (
    <div className="app">
      <Header />
      <main>
        {/* <RandomChar />
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charID={selectedChar} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={image} alt="vision" /> */}
        <ErrorBoundary>
          <ComicsList />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;
