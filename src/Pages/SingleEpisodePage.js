import { useParams, Link } from "react-router-dom";
import useMarvelService from "../services/MarvelService";
import { useState, useEffect } from "react";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

import "./SingleEpisodePage.scss";
import Img from "../img/x-men.png";

const SingleEpisodePage = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const { getEpisode, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateEpisode(episodeId);
  }, [episodeId]);

  const updateEpisode = (episodeId) => {
    clearError();
    getEpisode(episodeId).then(onEpisodeLoaded);
  };

  const onEpisodeLoaded = (episode) => {
    setEpisode(episode);
  };

  const errorMesage = error ? <ErrorMessage /> : null;
  const loader = loading ? <Spinner /> : null;
  const content = !(error || loading || !episode) ? (
    <View episode={episode} />
  ) : null;

  return (
    <div className="single-comic">
      {errorMesage}
      {loader}
      {content}
      <Link to="/episodes" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

const View = ({ episode }) => {
  const { episode_id, season, characters, airDate, title } = episode;
  return (
    <div className="single-comic__info">
      <h2 className="single-comic__name">Эпизод: {episode_id}</h2>
      <p className="single-comic__descr">
        Актеры:
        {characters.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </p>
      <p className="single-comic__descr">Дата съемки: {airDate}</p>
      <p className="single-comic__descr">Заглавие: {title}</p>
      <div className="single-comic__price">Номер сезона: {season}</div>
    </div>
  );
};
export default SingleEpisodePage;
