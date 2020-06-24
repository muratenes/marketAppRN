import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";
import AsyncStorage from "@react-native-community/async-storage";
import {showSuccessToastMessage} from "../helpers/helpers";


class BasketStore {
    @observable basket = null;
    @observable basketItems = [];
    @observable hasBasketItemQtyChange = false;
    @observable refreshing = false;
    @observable loading = false;

    @action
    async getBasket() {
        this.refreshing = this.loading = true;
        const {data} = await axios.get(`${API_BASE}/basket`)
        runInAction(() => {
            this.refreshing = this.loading = false;
            if (data.status) {
                this.basket = data.data;
                this.basketItems = data.data.items;
            }
        })
    }

    @action
    async addToBasket(productId, qty) {
        this.loading = true;
        const {data} = await axios.post(`${API_BASE}/addToBasket/${productId}`, {qty})

        runInAction(() => {
            this.loading = false;
            if (data.status) {
                this.basket = data.data;
                this.basketItems = data.data.items;
            } else {
                alert(data.message)
            }
        })
    }

    @action
    async updateBasketItemQty(productId, qty) {
        this.loading = true;
        const {data} = await axios.post(`${API_BASE}/updateBasketItemQty/${productId}`, {qty})
        runInAction(() => {
            this.loading = false;
            if (data.status) {
                this.basket = data.data;
                this.basketItems = data.data.items;
                showSuccessToastMessage('sepet güncellendi')
            }
        })
    }

    @action
    async updateBasketByBasketItems() {
        this.loading = true;
        const {data} = await axios.post(`${API_BASE}/updateBasketByBasketItems`, this.basketItems)
        runInAction(() => {
            if (data.status) {
                this.loading = false;
                this.basket = data.data;
                this.hasBasketItemQtyChange = false;
                this.basketItems = data.data.items;
            } else {
                this.loading = false;
                alert(data.message)
            }
        })
    }

    @action
    async decrementProductItem(productId) {
        this.loading = true;
        const {data} = await axios.post(`${API_BASE}/decrementProductItem/${productId}`)
        runInAction(() => {
            this.loading = false;
            if (data.status) {
                this.basket = data.data;
                this.basketItems = data.data.items;
            }
        })
    }

    @action
    async removeItemFromBasket(productId) {
        this.loading = true;
        const {data} = await axios.delete(`${API_BASE}/removeFromBasket/${productId}`)
        runInAction(() => {
            this.loading = false;
            if (data.status) {
                this.basket = data.data;
                this.basketItems = data.data.items;
            } else {
                alert(data.message)
            }
        })
    }
}

export default new BasketStore();
