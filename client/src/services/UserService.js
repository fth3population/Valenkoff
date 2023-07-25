import $api from '../http/index';


export default class UserService{

    static async like(_id){
        return $api.post(`/patterns/${_id}/add_like`)
    }

    static async unlike(_id){
        return $api.post(`/patterns/${_id}/delete_like`)
    }


}