import "./CharInfo.scss";
import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };
  marvelServise = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.charID !== prevProps.charID) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charID } = this.props;
    if (!charID) {
      return;
    }
    this.setState({ loading: true });
    this.marvelServise
      .getCharacter(charID)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  render() {
    const { char, loading, error } = this.state;

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
  }
}

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
