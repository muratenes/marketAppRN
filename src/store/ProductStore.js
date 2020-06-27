import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";
import {isInteger} from "formik";

type Product = {
    id: number,
    title: string,
    price : number,
    discount_price : number,
    image : string,
    unit_label :string,
    unit_amount : number
}

class ProductStore {
    @observable products: Array<Product>
    @observable categories = [];
    @observable loading = false;
    @observable refreshing = false;
    @observable selectedCategoryId = 0;
    @observable currentPage = 0;

    @action
    async getProducts(page = 1,query = '') {
        this.loading = true;
        this.currentPage = page;
        if (page === 1) {
          this.selectedCategoryId = 0;
        }
        const {data} = await axios.get(`${API_BASE}/products?page=${page}&q=${query}`)
        runInAction(() => {
            this.loading = false;
            this.products = page === 1 ? data.data.data : [...this.products, ...data.data.data];
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

    @action
    async getStoreProductsByCategoryId(id, page = 1) {
        this.loading = this.refreshing = true;
        if (id !== undefined) {
            this.selectedCategoryId = id;
        }
        this.currentPage = page;
        const {data} = await axios.get(`${API_BASE}/products/category/${this.selectedCategoryId}?page=${page}`)
        runInAction(() => {
            this.loading = this.refreshing = false;
            if (data.status) {
                this.products = page === 1 ? data.data.data : [...this.products, ...data.data.data];
            }
        })
    }

    @action
    async setCurrentCategoryValue(category){
        this.selectedCategoryId = category;
    }


    @action
    async getCategoriesByStore(){
        this.loading = true;
        const {data} = await axios.get(`${API_BASE}/store/categories`)
        runInAction(()=>{
            if (data.status) {
                this.loading = false;
                this.categories = data.data;
            }
        })
    }

    @action setCategories(categories){
        this.categories = categories;
    }
}

export default new ProductStore();
