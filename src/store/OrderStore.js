import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class OrderStore {
    @observable orders = [];
    @observable loading = false;

    @action
    async getOrders() {
        this.loading = true;
        const {data} = await axios.get(`${API_BASE}/orders`)
        runInAction(() => {
            this.loading = false;
            this.orders = data.data
        })
    }
}

export default new OrderStore();