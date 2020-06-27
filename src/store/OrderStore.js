import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class OrderStore {
    @observable orders = [];
    @observable loading = false;
    @observable refreshing = false;
    @observable pendingOrderCount = 0;

    // const
    @observable STATUS_ALINDI = 1;
    @observable STATUS_ONAYLANDI = 2;
    @observable STATUS_IPTAL = 3;
    @observable STATUS_TAMAMLANDI = 4;
    @observable STATUS_BASARISIZ = 5;

    @observable statusList = [
        {name: this.STATUS_ALINDI, backColor: 'orange', 'color': 'black'},
        {name: this.STATUS_ONAYLANDI, backColor: 'rgb(164,196,0)', 'color': 'black'},
        {name: this.STATUS_IPTAL, backColor: '#e57373', 'color': 'white'},
        {name: this.STATUS_TAMAMLANDI, backColor: '#6b9037', 'color': 'black'},
        {name: this.STATUS_BASARISIZ, backColor: '#d50000', 'color': 'white'},
    ];


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
        const {data} = await axios.get(`${API_BASE}/store/orders`)
        runInAction(() => {
            this.loading = this.refreshing = false;
            if (data.status) {
                this.orders = data.data.orders
                this.pendingOrderCount = data.data.pending_order_count
            }
        })
    }

    @action
    async setOrders(orders) {
        this.loading = this.refreshing = true;
        runInAction(() => {
            this.loading = this.refreshing = false;
            this.orders = orders
        })
    }

    @action
    async updateOrderStatus(orderId, status) {
        this.loading = true;
        const {data} = await axios.post(`${API_BASE}/store/updateOrderStatus`, {order_id: orderId, status: status})
        runInAction(() => {
            this.loading = false;
            if (data.status) {
                this.orders = data.data.orders;
                this.pendingOrderCount = data.data.pendingOrderCount;
                alert(data.message)
            }
        })
    }

    @action
    async setPendingOrderCount(pendingOrderCount) {
        runInAction(() => {
            this.pendingOrderCount = pendingOrderCount;
        })
    }
}

export default new OrderStore();
