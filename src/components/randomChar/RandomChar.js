import { useState, useEffect } from "react";
import image1 from "../../img/gun1.png";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./RandomChar.scss";

const Randomchar = () => {
  const { loading, error, getRandomCharacter, clearError } = useMarvelService();
  const [char, setChar] = useState([]);

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    getRandomCharacter().then(onCharLoaded);
  };

  const errorMesage = error ? <ErrorMessage /> : null;
  const loader = loading ? <Spinner /> : null;
  const content = !(error || loading) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMesage}
      {loader}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={image1} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};
const View = ({ char }) => {
  const { name, thumbnail, nickname, portrayed, status, charID } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__info__item">Имя: {name}</p>
        <p className="randomchar__info__item">Прозвище: {nickname}</p>
        <p className="randomchar__info__item">Актёр: {portrayed}</p>
        <p className="randomchar__info__item">Статус: {status}</p>
        <p className="randomchar__info__item">ID: {charID}</p>
      </div>
    </div>
  );
};
export default Randomchar;
