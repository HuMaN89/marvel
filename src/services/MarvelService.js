import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiBase = "https://breakingbadapi.com/api/";

  const getAllCharacters = async (offset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}`);
    return res.map(_transformCharacter);
  };
  const getDeads = async () => {
    const res = await request(`${_apiBase}deaths`);
    return res.map(_transformCharacter);
  };
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}`);
    return _transformCharacter(res[0]);
  };
  const getRandomCharacter = async () => {
    const res = await request(`${_apiBase}character/random`);
    return _transformCharacter(res[0]);
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
    getDeads,
  };
};

export default useMarvelService;
