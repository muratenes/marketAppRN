import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

//auth stack
import Login from './screens/Auth/Login'
import Register from './screens/Auth/Register'
import {Icon} from 'native-base';


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
    initialRouteName: 'Register',
    tabBarOptions: {
        activeTintColor: "#fff",
        inactiveBackgroundColor: "#5886589",
        style: {
            backgroundColor: "#171f33"
        }
    }
});

export default createAppContainer(authStack)