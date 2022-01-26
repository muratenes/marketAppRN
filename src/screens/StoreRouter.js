import React from 'react';
import {View, Badge, Text} from 'native-base';

import {createBottomTabNavigator} from "react-navigation-tabs";
import StoreOrderList from "./Store/Order/StoreOrderList";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductList from "./Store/Product/ProductList";
import Profile from './Store/Profile';

import {createStackNavigator} from "react-navigation-stack";
import StoreProductDetail from "./Store/Product/StoreProductDetail";
import StoreOrderListBottomNavigator from "../components/StoreOrderListBottomNavigator";

const ProductStackNavigator = createStackNavigator({
    ProductList: {
        screen: ProductList,
        navigationOptions: {
            title: 'Ürünlerim',
            tabBarIcon: ({tintColor}) => <Icon name={'list'} style={{color: tintColor}} size={22}/>,
            headerShown: false
        }
    },
    StoreProductDetail: {
        screen: StoreProductDetail
    }
})

export const  appStoreStack = createBottomTabNavigator({
    StoreOrderList: {
        screen: StoreOrderList,

        navigationOptions: {
            title: 'Siparişlerim',
            tabBarIcon: ({tintColor}) => <StoreOrderListBottomNavigator tintColor={tintColor}/>,
        },
    }, ProductList: {
        screen: ProductStackNavigator,
        navigationOptions: {
            title: 'Ürünlerim',
            tabBarIcon: ({tintColor}) => <Icon name={'list'} style={{color: tintColor}} size={22}/>
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profil',
            tabBarIcon: ({tintColor}) => <Icon name={'user'} style={{color: tintColor}} size={22}/>
        }
    }
}, {headerLayoutPreset: 'center', initialRouteName: 'StoreOrderList'})
