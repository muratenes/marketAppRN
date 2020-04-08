import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {H1} from 'native-base';

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.item = props.navigation.getParam('item');
    }

    render() {
        return (
            <View>
                <H1>{this.item.title}</H1>
            </View>
        );
    }
}

const styles = StyleSheet.create({});