import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";


class CompanyStore {
    @observable companies = [];

    @action
    async getCompanies() {
        const {data} = await axios.get(`${API_BASE}/stores`)
        runInAction(() => {
            this.companies = data.data
        })
    }
}

export default new CompanyStore();