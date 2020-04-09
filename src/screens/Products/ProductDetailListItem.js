import React from 'react';
import {Text} from 'react-native';
import {ListItem, Left, Right,Card,CardItem,Thumbnail,Image} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from "../../NavigationService";


const MovieListItem = ({item}) => (
        <Card onPress={()=>{NavigationService.navigate('ProductDetail',{item})}}>
            <CardItem>
                <Text>Instrumental Songs</Text>
                <Text note>Guitar</Text>
            </CardItem>
            <CardItem>
                <Icon name={'ios-musical-notes'} style={{color : '#ED4A6A'}} />
                <Text>Listen now</Text>
            </CardItem>
        </Card>
);
export default MovieListItem;