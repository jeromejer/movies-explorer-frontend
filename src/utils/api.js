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
            'authorization': 'Bearer ' + localStorage.getItem('jwt'),
        }
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

}

const api = new Api({
    endpoint: 'https://jeromejer.nomoredomains.work',
    headers: {
        'Content-type': 'application/json'
    }
  })

export default  api;