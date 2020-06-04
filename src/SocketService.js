import AsyncStorage from "@react-native-community/async-storage";
import Echo from "laravel-echo";
import {REDIS_IP, REDIS_PORT} from "./constants";
import Socketio from "socket.io-client";
import AuthStore from "./store/AuthStore";
import OrderStore from "./store/OrderStore";
import {Toast} from "native-base";

async function storeOrderSocketIoInitialize() {
    await AuthStore.getToken();
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user)
    if (user.is_store) {
        let echo = new Echo({
            broadcaster: 'socket.io',
            host: `http://${REDIS_IP}:${REDIS_PORT}`,
            client: Socketio,
            auth: {headers: {Authorization: "Bearer " + AuthStore.token}}
        });
        echo.private('store.' + user.id)
            .listen('NewOrderAddedEvent', (data) => {
                OrderStore.setPendingOrderCount(data.pendingOrderCount);
                OrderStore.getStoreOrders()
                Toast.show({
                    text: "Yeni Siparişin Var !",
                    buttonText: "Tamam",
                    buttonTextStyle: {color: "#008000"},
                    buttonStyle: {backgroundColor: "#5cb85c"}
                })
            });
    }
}

export default {
    storeOrderSocketIoInitialize
}
