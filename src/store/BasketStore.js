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
        this.refreshing = true;
        const {data} = await axios.get(`${API_BASE}/basket`)
        runInAction(() => {
            if (data.status) {
                this.refreshing = false;
                this.basket = data.data;
                this.basketItems = data.data.items;
            } else {
                this.refreshing = false;
                alert(data.message)
            }
        })
    }

    @action
    async addToBasket(productId, qty) {
        const {data} = await axios.post(`${API_BASE}/addToBasket/${productId}`, {qty})
        runInAction(() => {
            if (data.status) {
                showSuccessToastMessage('Sepete Eklendi')
                this.basket = data.data;
                this.basketItems = data.data.items;
            } else {
                alert(data.message)
            }
        })
    }

    @action
    async updateBasketItemQty(productId, qty) {
        const {data} = await axios.post(`${API_BASE}/updateBasketItemQty/${productId}`, {qty})
        runInAction(() => {
            if (data.status) {
                this.basket = data.data;
                this.basketItems = data.data.items;
            } else {
                alert(data.message)
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
        const {data} = await axios.post(`${API_BASE}/decrementProductItem/${productId}`)
        runInAction(() => {
            if (data.status) {
                this.basket = data.data;
                this.basketItems = data.data.items;
            } else {
                alert(data.message)
            }
        })
    }

    @action
    async removeItemFromBasket(productId) {
        const {data} = await axios.delete(`${API_BASE}/removeFromBasket/${productId}`)
        runInAction(() => {
            if (data.status) {
                showSuccessToastMessage('Ürün sepetten kaldırıldı')
                this.basket = data.data;
                this.basketItems = data.data.items;
            } else {
                alert(data.message)
            }
        })
    }
}

export default new BasketStore();