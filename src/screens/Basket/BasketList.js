import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {Container,View} from 'native-base';
import {inject, observer} from "mobx-react";
import Navbar from "../../components/Navbar";
import BasketListItem from "./BasketListItem";

@inject("BasketStore")
@observer
export default class BasketList extends Component {


    componentDidMount(): void {
        this.props.BasketStore.getBasket();
    }

    render() {
        const {BasketStore} = this.props;
        return (
            <Container>
                <Navbar/>

                <FlatList data={BasketStore.basketItems}
                          keyExtractor={item => item.id}
                          renderItem={({item}) => <BasketListItem item={item}/>}
                />
            </Container>
        );
    }
}