import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import LogoutButton from "../../components/LogoutButton";
import MovieListItem from "./MovieListItem";
import {Container, Content} from 'native-base';
import {inject, observer} from "mobx-react";

@inject("MovieStore")
@observer
export default class Home extends Component {
    static navigationOptions = {
        headerRight: () =>  <LogoutButton/>,
    }

    componentDidMount(): void {
        this.props.MovieStore.getMovies();
    }

    render() {
        const {MovieStore} = this.props;
        return (
            <Container>
                <Content>
                    <View>
                        <FlatList data={MovieStore.movies}
                                  keyExtractor={item => item._id}
                                  renderItem={({item}) => <MovieListItem item={item}/>}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});