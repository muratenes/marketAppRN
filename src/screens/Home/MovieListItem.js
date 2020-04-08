import React from 'react';
import {Text} from 'react-native';
import {ListItem, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from "../../NavigationService";


const MovieListItem = ({item}) => (
    <ListItem noIndent onPress={()=>{NavigationService.navigate('MovieDetail',{item})}}>
        <Left>
            <Text>{item.title}</Text>
        </Left>
        <Right>
            <Icon name="chevron-right"/>
        </Right>
    </ListItem>
);
export default MovieListItem;