'use client'

const ApiController = () => {
    const localApiUrl = "http://127.0.0.1:5000/api";
    const serverApiUrl = "http://www.bing.come";
    const token = "3hgsfouvfnajks93"

    const apiUrl = localStorage.getItem('useServerApi') === 'true' ? serverApiUrl : localApiUrl;
    return {apiUrl: apiUrl, token: token};
}

export default ApiController;
