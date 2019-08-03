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
};

export const authenticationUser = async (data) => {
    return axios.post('/login', data);
};

export const getUserByEmail = async (emailId) => {
    return axios.get(`/user/email/${emailId}`);
};

export const getCategoriesWithEmail = (email) => {
    let headers = {'Content-Type': 'application/json'};
    if (email) {
        headers['email'] = email;
    }
    return axios.get(`/filtered/group`, {headers});
};

// CRUD TAGS
export const getAllTags = () => {
    return axios.get(`/tag`);
};

export const updateTagByName = (data) => {
    return axios.put(`/tagName/${data.name}`, {
        name: data.newName,
        description: data.description
    });
};

export const createNewTag = (data) => {
    return axios.post('/tag', {
        name: data.name,
        description: data.description
    });
};

export const deleteTagById = (id) => {
    return axios.delete(`/tag/${id}`);
};

// CRUD GROUPS

export const getAllGroups = () => {
    return axios.get(`/group`);
};

export const getAllGroupsWithQuestions = () => {
    return axios.get(`/groupWithQuestions`);
}

export const createNewGroup = (data) => {
    return axios.post(`/group`, {
        title: data.name,
        slug: data.slug,
        description: data.description,
        premium: data.premium
    });
};

export const updateGroupById = (data) => {
    return axios.put(`/group/${data.id}`, {
        title: data.name,
        slug: data.slug,
        description: data.description,
        premium: data.premium
    });
};

export const deleteGroupById = (id) => {
    return axios.delete(`/group/${id}`);
};

// QUESTION
export const createNewArticle = (data) => {
    return axios.post(`/question`, {
        title: data.title,
        type: data.type,
        question: data.question,
        answer: data.answer,
        tags: data.tags,
        groups: data.groups
    });
};