import axios from 'axios';

export const getAllQuestions = ()=>{
    const promise = new Promise((resolve, reject)=>{
        axios.get(`/question`)
        .then(data => {
            // console.log('Response from XHR is: ', data);
            resolve(data);
        });
    });
    return promise;
}

export const authenticationUser = async (data) => {
    return axios.post('/login', data);
}

export const getUserByEmail = async (emailId) => {
    return axios.get(`/user/email/${emailId}`);
}

export const getCategoriesWithEmail = (email) => {
    let headers = {'Content-Type': 'application/json'};
    if (email) {
        headers['email'] = email;
    }
    return axios.get(`/filtered/group`, {headers});
}