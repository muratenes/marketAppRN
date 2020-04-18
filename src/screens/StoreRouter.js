import React from 'react';

import {createBottomTabNavigator} from "react-navigation-tabs";
import StoreOrderList from "./Store/Order/StoreOrderList";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductList from "./Store/Product/ProductList";
import {createStackNavigator} from "react-navigation-stack";
import StoreProductDetail from "./Store/Product/StoreProductDetail";

const ProductStackNavigator = createStackNavigator({
    ProductList: {
        screen: ProductList,
        navigationOptions: {
            title: 'Ürünlerim',
            tabBarIcon: ({tintColor}) => <Icon name={'list'} style={{color: tintColor}} size={22}/>,
            headerShown : false
        }
    },
    StoreProductDetail: {
        screen : StoreProductDetail
    }
})


export const appStoreStack = createBottomTabNavigator({
    StoreOrderList: {
        screen: StoreOrderList,
        navigationOptions: {
            title: 'Siparişlerim',
            tabBarIcon: ({tintColor}) => <Icon name={'shopping-bag'} style={{color: tintColor}} size={22}/>
        }
    }, ProductList: {
        screen: ProductStackNavigator,
        navigationOptions: {
            title: 'Ürünlerim',
            tabBarIcon: ({tintColor}) => <Icon name={'list'} style={{color: tintColor}} size={22}/>
        }
    }
}, {headerLayoutPreset: 'center', initialRouteName: 'ProductList'})