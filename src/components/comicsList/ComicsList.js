import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "../button/Button";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import "./ComicsList.scss";
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {
  const { loading, error, getEpisodes } = useMarvelService();

  const [episodesList, setEpisodesList] = useState([]);
  const [offset, setOffset] = useState(1);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [episodesEnded, setEpisodesEnded] = useState(false);

  const onRequest = () => {
    onEpisodesListLoading();
    getEpisodes(offset).then(onEpisodesListLoaded);
  };

  const onEpisodesListLoading = () => {
    setOffset(offset + 8);
  };
  const onEpisodesListLoaded = (newEpisodesList) => {
    let ended = false;
    if (newEpisodesList.length < 8) {
      ended = true;
      setEpisodesEnded(ended);
    }

    setEpisodesList((episodesList) => [...episodesList, ...newEpisodesList]);
    setNewItemsLoading(false);
  };

  useEffect(() => {
    onRequest();
  }, []);

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {episodesList.map((item) => {
          return (
            <li className="comics__item" key={item.episode_id}>
              <Link to={`/episodes/${item.episode}`}>
                {/* <img
                  src={item.src}
                  alt={item.alt}
                  className="comics__item-img"
                /> */}
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-name">Episode: {item.episode}</div>
                <div className="comics__item-price">{item.air_date}</div>
              </Link>
            </li>
          );
        })}
      </ul>

      {loading && !newItemsLoading ? <Spinner /> : ""}
      {error ? <ErrorMessage /> : null}
      <Button
        onRequest={onRequest}
        newItemsLoading={newItemsLoading}
        charEnded={episodesEnded}
      />
    </div>
  );
};

export default ComicsList;
