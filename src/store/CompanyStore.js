import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";
import AuthStore from "./AuthStore";


class CompanyStore {
    @observable companies = [];

    @action
    async getCompanies() {
        const {data} = await axios.get(`${API_BASE}/stores`, {
            headers: {
                'Authorization': 'Bearer ' + AuthStore.token
            }
        })
        runInAction(() => {
            alert(data)
            this.companies = data
        })
    }
}

export default new CompanyStore();