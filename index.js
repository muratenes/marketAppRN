/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthStore from "./src/store/AuthStore";
import axios from 'axios';

AppRegistry.registerComponent(appName, () => App);

axios.interceptors.request.use(request => {
    const token = AuthStore.token;
    request.headers.common['Accept'] = "application/json";
    if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return request;
});
