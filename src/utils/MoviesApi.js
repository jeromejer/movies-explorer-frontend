class MoviesApi {
    constructor({endpoint, headers}) {
        this._endpoint = endpoint
        this._headers = headers
    }

    _resStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMoviesData() {
        return fetch(`${this._endpoint}`, {
            headers: this.headers(),
        })
        .then(this._resStatus);
    }

}

const moviesApi = new MoviesApi({
    endpoint: 'api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-type': 'application/json'
    }
  })

export default  moviesApi;