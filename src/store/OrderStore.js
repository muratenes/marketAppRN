import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class OrderStore {
    @observable orders = [];
    @observable loading = false;
    @observable refreshing = false;

    // const
    @observable STATUS_ALINDI = 1;
    @observable STATUS_ONAYLANDI = 2;
    @observable STATUS_IPTAL = 3;
    @observable STATUS_TAMAMLANDI = 4;


    @action
    async getOrders() {
        this.loading = this.refreshing = true;
        const {data} = await axios.get(`${API_BASE}/orders`)
        runInAction(() => {
            this.loading = this.refreshing = false;
            this.orders = data.data
        })
    }

    @action
    async getStoreOrders() {
        this.loading = this.refreshing = true;
        const {data} = await axios.get(`${API_BASE}/store/getStoreOrders`)
        runInAction(() => {
            this.loading = this.refreshing = false;
            this.orders = data.data
        })
    }

    @action
    async updateOrderStatus(orderId, status) {
        const {data} = await axios.post(`${API_BASE}/store/updateOrderStatus`, {order_id: orderId, status: status})
        runInAction(() => {
            if (data.status) {
                this.orders = data.data;
                alert(data.message)
            }else{
                alert(data.message)
            }

        })
    }
}

export default new OrderStore();