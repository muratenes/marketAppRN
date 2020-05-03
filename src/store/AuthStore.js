import {action, observable} from "mobx";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../NavigationService";
import axios from "axios";
import {API_BASE} from "../constants";

class AuthStore {
    @observable token = null;
    @observable firebase_token = null;
    @observable user = null;

    @action
    async saveToken(token) {
        try {
            await AsyncStorage.setItem('token', token)
            await this.setupAuth();
        } catch (e) {
            console.log(e)
        }
    }


    @action
    async setupAuth() {
        await this.getToken();
    }

    @action
    async removeToken() {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        await this.getToken();
    }

    @action
    async getToken() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                NavigationService.navigate('Auth')
                return false;
            }
            this.token = token;
            const userData = JSON.parse(await AsyncStorage.getItem('user'));
            this.user = userData;
            if (userData.is_store) {
                NavigationService.navigate('StoreApp')
            } else {
                NavigationService.navigate('App')
            }

        } catch (e) {
            console.warn(e)
        }
    }

    @action
    async saveFirebaseToken(token) {
        try {
            await AsyncStorage.setItem('firebase_token', token)
            await this.getFirebaseToken();
            await axios.post(`${API_BASE}/saveFirebaseToken`, {token})
        } catch (e) {
            console.log(e)
        }
    }

    @action
    async getFirebaseToken() {
        try {
            this.firebase_token = await AsyncStorage.getItem('firebase_token')
            console.log('firebase token', this.firebase_token)
        } catch (e) {
            console.log(e)
        }
    }

    @action
    async getSessionUser() {
        try {
            this.user = await AsyncStorage.getItem('firebase_token')
        }catch (e) {

        }
    }
}

export default new AuthStore();
