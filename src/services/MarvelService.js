import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, setLoading, error, request, clearError } = useHttp();

  const _apiBase = "https://breakingbadapi.com/api/";

  const getAllCharacters = async (offset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}`);
    return res.map(_transformCharacter);
  };
  const getEpisodes = async (offset) => {
    const resArr = [];
    setLoading(true);
    for (let i = offset; i < offset + 8; i++) {
      const res = await request(`${_apiBase}episodes/${i}`);
      resArr.push(...res);
    }
    setLoading(false);
    return resArr;
  };
  const getEpisode = async (id) => {
    setLoading(true);
    const res = await request(`${_apiBase}episodes/${id}`);
    setLoading(false);
    return _transformEpisode(res[0]);
  };
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}`);
    return _transformCharacter(res[0]);
  };
  const getRandomCharacter = async () => {
    const res = await request(`${_apiBase}character/random`);
    return _transformCharacter(res[0]);
  };
  const getSearchCharacter = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}`);
    if (res.length === 0) return false;
    return _transformCharacter(res[0]);
  };
  const _transformEpisode = (episode) => {
    return {
      episode_id: episode.episode_id,
      season: episode.season,
      characters: episode.characters,
      airDate: episode.air_date,
      title: episode.title,
    };
  };
  const _transformCharacter = (char) => {
    let occupation = null;
    if (char.occupation.length <= 2) {
      occupation = char.occupation;
      occupation.push("work1");
      occupation.push("work2");
    }
    return {
      name: char.name,
      nickname: char.nickname,
      thumbnail: char.img,
      charID: char.char_id,
      occupation: occupation || char.occupation,
      portrayed: char.portrayed,
      status: char.status,
      clazz: "char__item",
    };
  };
  return {
    error,
    loading,
    clearError,
    getAllCharacters,
    getCharacter,
    getRandomCharacter,
    getEpisodes,
    getEpisode,
    getSearchCharacter,
  };
};

export default useMarvelService;
