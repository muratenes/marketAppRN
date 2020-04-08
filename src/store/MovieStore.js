import {action, observable, runInAction} from "mobx";
import axios from "axios";
import {API_BASE} from "../constants";
import AuthStore from "./AuthStore";


class MovieStore {
    @observable movies = [];


    @action
    async getMovies() {
        const {data} = await axios.get(`${API_BASE}/api/movies`, {
            headers: {
                'x-access-token': AuthStore.token
            }
        })
        runInAction(() => {
            this.movies = data
        })
    }
}

export default new MovieStore();