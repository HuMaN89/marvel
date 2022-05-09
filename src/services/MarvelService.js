class MarvelService {
  _apiBase = "https://breakingbadapi.com/api/";
  getResourses = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async (offset) => {
    const res = await this.getResourses(
      `${this._apiBase}characters?limit=9&offset=${offset}`
    );
    return res.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const res = await this.getResourses(`${this._apiBase}characters/${id}`);
    return this._transformCharacter(res[0]);
  };
  getRandomCharacter = async () => {
    const res = await this.getResourses(`${this._apiBase}character/random`);
    return this._transformCharacter(res[0]);
  };
  _transformCharacter = (char) => {
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
}

export default MarvelService;
