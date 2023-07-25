import $api from '../http/index';


export default class PostService {

    static async addMemes() {
        return $api.post('/logout')
    }

    static async currentTemplates(id){
        return $api.get(`patterns/${id}`)
    }


    static async getTemplates(){
        return $api.get('/all_patterns')
    }

    static async getFavorite(){
        return $api.get('/patterns')
    }

    static async getMyMemes(){
        return $api.get('/memes')
    }

}