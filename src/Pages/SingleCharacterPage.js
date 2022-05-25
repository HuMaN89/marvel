import { useParams, Link } from "react-router-dom";
import useMarvelService from "../services/MarvelService";
import { useState, useEffect } from "react";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

import "./SingleEpisodePage.scss";

const SingleCharacterPage = () => {
  const { CharacterId } = useParams();
  const [character, setCharacter] = useState(null);
  const { getCharacter, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateCharacter(CharacterId);
  }, [CharacterId]);

  const updateCharacter = (CharacterId) => {
    clearError();
    getCharacter(CharacterId).then(onCharacterLoaded);
  };

  const onCharacterLoaded = (character) => {
    setCharacter(character);
  };

  const errorMesage = error ? <ErrorMessage /> : null;
  const loader = loading ? <Spinner /> : null;
  const content = !(error || loading || !character) ? (
    <View character={character} />
  ) : null;

  return (
    <div className="single-comic">
      {errorMesage}
      {loader}
      {content}
      <Link to="/" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

const View = ({ character }) => {
  const { name, thumbnail, nickname, portrayed, status, charID } = character;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        style={{ width: "200px" }}
        alt="Random character"
        className="randomchar__img"
      />
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
export default SingleCharacterPage;
