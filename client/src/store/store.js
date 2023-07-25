import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {API_URL} from "../http";
export default class Store{
    isAuth = false;
    role = "";
    id = null
    email = ""
    username = ""
    constructor() {
        makeAutoObservable(this);
    }
    setAuth(bool){
        this.isAuth = bool;
    }

    setRole(str){
        this.role = str;
    }

    setId(num){
        this.id = num;
    }

    setEmail(str){
        this.email = str;
    }

    setUsername(str){
        this.username = str;
    }
    async login(email, password){
        try {
            const response = await AuthService.login(email, password);
            console.log("RESP LOG", response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setId(response.data.userDto.id);
            this.setEmail(response.data.userDto.email);
            this.setUsername(response.data.userDto.username);
            await this.getRole()
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(username, email, password){
        try {
            const response = await AuthService.registration(username, email, password);
            console.log("RESP REG", response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setId(response.data.userDto.id);
            this.setEmail(response.data.userDto.email);
            this.setUsername(response.data.userDto.username);
            await this.getRole();
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout(){
        try {
            const response = await AuthService.logout();
            console.log("RESP LOGOUT", response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setRole("");
            this.setId(null);
            this.setEmail("");
            this.setUsername("");
            localStorage.removeItem('role');

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth(){
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            console.log("checkAuth", response);
            console.log("TOKEN", response.data.accessToken)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            await this.getRole();
            // this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getRole(){
        try {
            const response = await AuthService.getRole()
            console.log("ROLE", response.data)
            localStorage.setItem('role', response.data);
            this.setRole(response.data)
            this.setId(response.data.userDto.id);
            this.setEmail(response.data.userDto.email);
            this.setUsername(response.data.userDto.username);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

}