import { Component } from "react";
import image1 from "../../img/gun1.png";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./RandomChar.scss";

// const marvelService = new MarvelService();
// marvelService.getRandomCharacter().then((res) => console.log(res));

class Randomchar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  marvelService = new MarvelService();

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  updateChar = () => {
    this.setState({ loading: true });
    this.marvelService
      .getRandomCharacter()
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
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
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={image1} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}
const View = ({ char }) => {
  const { name, thumbnail, nickname, portrayed, occupation, status, charID } =
    char;
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
