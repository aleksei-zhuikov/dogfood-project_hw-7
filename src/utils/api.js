// const freshHeaders = () => {
//     return {
//         headers: {
//             'content-type': 'application/json',
//             Authorization: localStorage.getItem('token')
//             // Authorization: this._token,
//         }
//     }
// }

// const config = {
//     baseUrl: 'https://api.react-learning.ru',
//     headers: {
//         'content-type': 'application/json',
//         // Authorization: this._token,
//     },
//     freshHeaders: freshHeaders

// };

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

// const token = localStorage.getItem('token');
// console.log('token from api-js>>', token)
class Api {
    constructor({ baseUrl, token }) {
        // console.log('data from Api-Constructor >>', data)
        this._baseUrl = baseUrl;
        // this._headers = headers;
        this._token = null;
        // this._freshHeaders = freshHeaders;

        console.log('this._baseUrl >>>', this._baseUrl)
        // console.log('this._headers >>>', this._headers)
        // console.log('this.freshHeaders >>>', this._freshHeaders)
        console.log('this.token from api >>>', this._token)

    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            // headers: this._headers
            // ...this._freshHeaders(),
            headers: {
                authorization: this._token,
            },
        }).then(onResponse)
    }

    getUserInfo() {
        console.log('this is headers from Api getUserInfo >>', this._headers)
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
            // headers: this._headers
            // ...this._freshHeaders(),
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
            // headers: this._headers,
            body: JSON.stringify(reviewData)
        }).then(onResponse)
    }

    search(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            // headers: this._headers,
            // ...this._freshHeaders(),
            headers: {
                authorization: this._token
            }
        }).then(onResponse)
    }

    changeLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            // headers: this._headers
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            }
        }).then(onResponse)
    }

    login(dataUser) {
        // console.log('dataUser from Api-login >>', dataUser)
        return fetch(`${this._baseUrl}/signin`, {
            // headers: this._headers,
            // ...this._freshHeaders(),
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(dataUser)
        }).then((res) => onResponse(res))

    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',

};

const api = new Api(config);

export default api;