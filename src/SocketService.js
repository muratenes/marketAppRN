import AsyncStorage from "@react-native-community/async-storage";
import Echo from "laravel-echo";
import {REDIS_IP, REDIS_PORT, ROLE_STORE, ROLE_STORE_WORKER} from "./constants";
import Socketio from "socket.io-client";
import AuthStore from "./store/AuthStore";
import OrderStore from "./store/OrderStore";
import {Toast} from "native-base";

async function storeOrderSocketIoInitialize() {
    await AuthStore.getToken();
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user)
    if (user) {
        if (user.role_id == ROLE_STORE || user.role_id == ROLE_STORE_WORKER) {
            let echo = new Echo({
                broadcaster: 'socket.io',
                host: `http://${REDIS_IP}:${REDIS_PORT}`,
                client: Socketio,
                auth: {headers: {Authorization: "Bearer " + AuthStore.token}}
            });
            let channelNameWithValue = 'store.' + user.id;
            let eventName = 'NewOrderAddedEvent'
            if (user.role_id == ROLE_STORE_WORKER) {
                channelNameWithValue = 'store.order.worker:' + user.id
                eventName = 'NewOrderAddedForWorkerEvent'
            }
            echo.private(channelNameWithValue)
                .listen(eventName, (data) => {
                    OrderStore.setPendingOrderCount(data.pendingOrderCount);
                    OrderStore.getStoreOrders()
                    Toast.show({
                        text: "Yeni Siparişin Var !",
                        buttonText: "Tamam",
                        buttonTextStyle: {color: "#008000"},
                        buttonStyle: {backgroundColor: "#5cb85c"}
                    })
                });
            echo.connector.socket.on('connect', function () {
                console.log('bağlandı')
            }).on('disconnect', function () {
                console.log('bağlanmadı')
            })
        }
    }

}

export default {
    storeOrderSocketIoInitialize
}
