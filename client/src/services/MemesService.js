import $api from '../http/index';

const sendMemesToFile = async (id, data) => {
    return await $api
        .post(`/patterns/${id}/add`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        .then((response) => {
            return response.data.length
        });
};


const MemesService = {
    sendMemesToFile,
};

export default MemesService;