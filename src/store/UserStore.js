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
            this.sessionUser = data.data
        })
    }

    @action
    async addUserToSession(userData) {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData))
            this.sessionUser = await AsyncStorage.getItem('user');
            this.user = userData;
        } catch (e) {
            console.log('hata27',e)
        }
    }
}

export default new UserStore();
