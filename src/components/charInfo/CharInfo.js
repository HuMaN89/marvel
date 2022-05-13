import "./CharInfo.scss";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
  const [char, setChar] = useState(props.charID);
  const { charID } = props;

  const { getCharacter, loading, error } = useMarvelService();

  useEffect(() => {
    updateChar(charID);
  }, [charID]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (props.charID !== prevProps.charID) {
  //     updateChar();
  //   }
  // }

  const updateChar = (charID) => {
    if (!charID) {
      return;
    }
    getCharacter(charID).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = error || loading || char ? null : <Skeleton />;
  const errorMesage = error ? <ErrorMessage /> : null;
  const loader = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMesage}
      {loader}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, nickname, portrayed, status, thumbnail, occupation } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__info-name">{nickname}</div>
          <div className="char__info-name">{portrayed}</div>
          <div className="char__info-name">{status}</div>
        </div>
      </div>
      <div className="char__descr"></div>
      <div className="char__comics">занятость:</div>
      <ul className="char__comics-list">
        {occupation.map((item, i) => {
          return (
            <li className="char__comics-item" key={i}>
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
