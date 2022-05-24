import { localStorageConst } from "../constants/const";

class Api {
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

    headers(){
        return {
            ...this._headers,
            'authorization': 'Bearer ' + localStorage.getItem(localStorageConst.jwt),
        }
    }
    
    signin({ email, password }) {
        return fetch(`${this._endpoint}/signin`, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify({ email, password })
        })
        .then(this._resStatus);
    }

    signup({ name, email, password }) {
        return fetch(`${this._endpoint}/signup`, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify({ name, email, password })
        })
        .then(this._resStatus);
    }
    
    checkToken() {
        return fetch(`${this._endpoint}/users/me`, {
            method: 'GET',
            headers: this.headers(),
        })
        .then(this._resStatus);
    }

    getUserData() {
        return fetch(`${this._endpoint}/users/me`, {
            headers: this.headers()
        })
        .then(this._resStatus);
    }


    updateUserData({name, email}) {
        return fetch(`${this._endpoint}/users/me`, {
            method: 'PATCH',
            headers: this.headers(), 
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
        .then(this._resStatus)
    }

    getSaveMovies() {
        return fetch(`${this._endpoint}/movies`, {
            headers: this.headers(), 
        })
        .then(this._resStatus)
    }

    addMovie(movie) {
        return fetch(`${this._endpoint}/movies`, {
            method: 'POST',
            headers: this.headers(), 
            body: JSON.stringify({
                country:  movie.country || ' ',
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                trailerLink: movie.trailerLink,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`
            })
        })
        .then(this._resStatus)
    }

    deleteMovie(id) {
        return fetch(`${this._endpoint}/movies/${id}`, {
            method: 'DELETE',
            headers: this.headers(), 
        })
        .then(this._resStatus)
    }


}

const api = new Api({
    endpoint: 'https://jeromejer.nomoredomains.work',
    headers: {
        'Content-type': 'application/json'
    }
  })


export default  api;