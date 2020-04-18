import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";
import AsyncStorage from "@react-native-community/async-storage";


class UserStore {
    @observable user = null;
    @observable sessionUser = null;

    @action
    async getUserDetail() {
        const {data} = await axios.post(`${API_BASE}/details`)
        runInAction(() => {
            this.user = data.data
        })
    }

    @action
    async addUserToSession(userData) {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData))
            this.sessionUser = await AsyncStorage.getItem('user');
        } catch (e) {
            console.log(e)
        }
    }

    @action
    async getUserFromSession() {
        try {
            this.sessionUser = await JSON.parse(AsyncStorage.getItem('user'))
            console.log(this.sessionUser)
        } catch (e) {
            return null;
        }
    }

    @action
    async addUserIsStoreInfo(isStore) {
        try {
            this.sessionUser = await AsyncStorage.setItem('user', isStore)
            //console.log(await AsyncStorage.getItem('user_store'))
        } catch (e) {
            console.log(e)
        }
    }
}

export default new UserStore();