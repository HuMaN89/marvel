import React, { Component } from "react";
import "./CharList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charList: [],
      loading: true,
      error: false,
      offset: 0,
      newItemsLoading: false,
      charEnded: false,
    };
  }

  marvelService = new MarvelService();

  onRequest = () => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(this.state.offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState(({ offset }) => ({
      offset: offset + 9,
      newItemsLoading: true,
    }));
  };
  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
      this.setState({ charEnded: ended });
    }
    this.setState(({ charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemsLoading: false,
    }));
  };
  onError = () => {
    this.setState({ loading: false, error: true });
  };

  componentDidMount() {
    this.onRequest();
    this.setState({ offset: this.state.offset + 9 });
  }

  componentDidUpdate() {}

  onClicked = (e) => {
    let target = e.currentTarget.dataset.id;
    this.props.onCharSelected(target);
    this.setState(({ charList }) => ({
      charList: charList.map((item) => {
        if (item.charID == target) {
          return { ...item, clazz: "char__item char__item_selected" };
        }
        return { ...item, clazz: "char__item " };
      }),
    }));
  };
  render() {
    const { error, loading, newItemsLoading, charEnded } = this.state;

    return (
      <div className="char__list">
        {/* <CharGrid charList={this.state.charList} onClicked={this.onClicked} /> */}
        {loading ? <Spinner /> : null}
        {error ? <ErrorMessage /> : null}
        {!(error || loading) ? (
          <CharGrid charList={this.state.charList} onClicked={this.onClicked} />
        ) : null}
        <Button
          onRequest={this.onRequest}
          newItemsLoading={newItemsLoading}
          charEnded={charEnded}
        />
      </div>
    );
  }
}

class CharGrid extends Component {
  render() {
    const { onClicked, charList } = this.props;
    return (
      <ul className="char__grid">
        {charList.map((item, idx) => {
          return (
            <li
              tabIndex={idx + 1}
              className={item.clazz}
              onFocus={onClicked}
              key={item.charID}
              data-id={item.charID}
            >
              <img src={item.thumbnail} alt={item.charID} />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}

const Button = (props) => {
  if (props.newItemsLoading) {
    return (
      <button
        className="button button__main button__long"
        style={{
          color: "#44014C",
          display: props.charEnded ? "none" : "block",
        }}
      >
        <div className="inner" onClick={props.onRequest}>
          load more
        </div>
      </button>
    );
  }
  return (
    <button className="button button__main button__long">
      <div className="inner" onClick={props.onRequest}>
        load more
      </div>
    </button>
  );
};

export default CharList;
