import React, { useState, useEffect } from "react";
import "./CharList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, loading, error } = useMarvelService();

  const onRequest = (initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    onCharListLoading();
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoading = () => {
    setOffset(offset + 9);
  };
  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
      setCharEnded(ended);
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemsLoading(false);
  };

  useEffect(() => {
    onRequest(true);
  }, []);

  return (
    <div className="char__list">
      {loading && !newItemsLoading ? <Spinner /> : null}
      {error ? <ErrorMessage /> : null}

      <CharGrid charList={charList} onCharSelected={props.onCharSelected} />

      {newItemsLoading ? (
        <Spinner />
      ) : (
        <Button
          onRequest={onRequest}
          newItemsLoading={newItemsLoading}
          charEnded={charEnded}
        />
      )}
    </div>
  );
};

const CharGrid = ({ onCharSelected, charList }) => {
  const onFocused = (e) => {
    let target = Number(e.currentTarget.dataset.id);
    onCharSelected(target);
  };
  return (
    <ul className="char__grid">
      {charList.map((item, idx) => {
        return (
          <li
            tabIndex={idx + 1}
            className={item.clazz}
            onFocus={onFocused}
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
};

const Button = (props) => {
  if (props.charEnded) {
    return null;
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
