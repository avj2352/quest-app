import axios from 'axios';

export const getAllQuestions = ()=>{
    const promise = new Promise((resolve, reject)=>{
        axios.get(`/question`)
        .then(data => {
            console.log('Response from XHR is: ', data);
            resolve(data);
        });
    });
    return promise;
}

export const authenticationUser = async (data) => {
    return axios.post('/login', data);
}