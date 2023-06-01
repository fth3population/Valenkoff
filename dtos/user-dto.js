export default class UserDto{
    id;
    email;
    username;
    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.username = model.username
    }
}