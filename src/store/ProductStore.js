import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";
import AuthStore from "./AuthStore";


class ProductStore {
    @observable products = [];

    @action
    async getProducts() {
        const {data} = await axios.get(`${API_BASE}/products`, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.token
            }
        })
        runInAction(() => {
            this.products = data.data
        })
    }
}

export default new ProductStore();