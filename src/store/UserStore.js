import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class UserStore {
    @observable user = null;

    @action
    async getUserDetail() {
        const {data} = await axios.post(`${API_BASE}/details`)
        runInAction(() => {
            this.user = data.data
        })
    }
}

export default new UserStore();