import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class ProductStore {
    @observable products = [];

    @action
    async getProducts() {
        const {data} = await axios.get(`${API_BASE}/products`)
        runInAction(() => {
            this.products = data.data
        })
    }
}

export default new ProductStore();