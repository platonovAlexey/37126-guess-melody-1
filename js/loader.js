const SERVER_URL = `https://es.dump.academy/guess-melody`;
const DEFAULT_ID = `id37126`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then((res) => res.json());
  }

  static loadResults(name = DEFAULT_ID) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((res) => res.json());
  }

  static saveResults(data, name = DEFAULT_ID) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}
