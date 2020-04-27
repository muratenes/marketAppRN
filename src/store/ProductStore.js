import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class ProductStore {
    @observable products = [];
    @observable loading = false;
    @observable refreshing = false;

    @action
    async getProducts() {
        this.loading = this.refreshing = true;
        const {data} = await axios.get(`${API_BASE}/products`)
        runInAction(() => {
            this.loading = this.refreshing = false;
            this.products = data.data
        })
    }

    @action
    async getStoreProducts() {
        this.loading = this.refreshing = true;
        const {data} = await axios.get(`${API_BASE}/store/products`)
        runInAction(() => {
            this.loading = this.refreshing = false;
            this.products = data.data
        })
    }
}

export default new ProductStore();
