import {action, observable, runInAction} from "mobx";
import {API_BASE} from "../constants";
import axios from "axios";
class CategoryStore {
    @observable categories = [];
    @observable loading = false;

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
export default new CategoryStore();