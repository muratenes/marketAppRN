import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

//app stack
import Home from '../src/screens/Home';

//auth stack
import Login from './screens/Auth/Login'
import Register from './screens/Auth/Register'
import {Icon} from 'native-base';
import {createStackNavigator} from "react-navigation-stack";
import AuthLoading from "./screens/AuthLoading";
import MovieDetail from "./screens/MovieDetail";

const appStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Anasayfa'
        }
    },MovieDetail: {
        screen: MovieDetail,
        navigationOptions: {
            title: 'Movie Detail'
        }
    }
}, {headerLayoutPreset: 'center'});

const authStack = createBottomTabNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name={'log-in'} style={{color: tintColor}}/>
        }
    }, Register: {
        screen: Register,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name={'person-add'} style={{color: tintColor}}/>
        }
    }
}, {
    initialRouteName: 'Login',
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveBackgroundColor: "#5886589",
        style: {
            backgroundColor: "#171f33"
        }
    }
});


const switchNavigator = createSwitchNavigator(
    {
        AutoLoading: AuthLoading,
        App: appStack,
        Auth: authStack
    }, {
        initialRouteName: 'AutoLoading'
    }
)
export default createAppContainer(switchNavigator)