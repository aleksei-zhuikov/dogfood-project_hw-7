
const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}


class Api {
    constructor({ baseUrl, token }) {
        this._baseUrl = baseUrl;
        this._token = token;

    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
    }

    getProductById(idProduct) {
        return fetch(`${this._baseUrl}/products/${idProduct}`, {
            // headers: this._headers
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(onResponse)
    }

    setUserInfo(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUser)
        }).then(onResponse)
    }

    createReviewProduct(productId, reviewData) {
        return fetch(`${this._baseUrl}/products/review/${productId}`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData)
        }).then(onResponse)
    }

    search(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {

            headers: {
                authorization: this._token
            }
        }).then(onResponse)
    }

    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            }
        }).then(onResponse)
    }

    login(dataUser) {
        // console.log('dataUser from Api-login >>', dataUser)
        return fetch(`${this._baseUrl}/signin`, {

            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(dataUser)
        }).then((res) => onResponse(res))

    }

    registerUser(data) {
        return fetch(`${this._baseUrl}/signup`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(data),
        }).then((res) => onResponse(res))
    }


    changeUserName(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            method: 'PATCH',
            body: JSON.stringify(data),

        }).then((res) => {
            // console.log('res from api change name >>>', res)
            return onResponse(res)
        })
    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',

};

const api = new Api(config);

export default api;