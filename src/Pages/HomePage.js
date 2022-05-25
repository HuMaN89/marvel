import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import image from "../img/vision.png";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import { useState } from "react";
import CharInfo from "../components/charInfo/CharInfo";
import Search from "../components/search/Search";
import Helmet from "react-helmet";

const HomePage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <title>Breaking Bad | Home</title>
      </Helmet>
      <RandomChar />
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <div>
            <CharInfo charID={selectedChar} />
            <Search />
          </div>
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={image} alt="vision" />
    </>
  );
};

export default HomePage;
