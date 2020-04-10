import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class BasketStore {
    @observable basket = [];
    @observable basketItems = [];

    @action
    async getBasket() {
        const {data} = await axios.get(`${API_BASE}/basket`)
        runInAction(() => {
            if (data.status) {
                console.log(data)
                this.basket = data.data;
                this.basketItems = data.data.items;
            }else{
                alert(data.message)
            }
        })
    }
}

export default new BasketStore();