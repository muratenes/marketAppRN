import React, {Component} from 'react';
import {Body, Header, Title} from "native-base";

import RegisterForm from './RegisterForm';


export default class Register extends Component {
  render() {
    return (
        <React.Fragment>
          <Header>
            <Body>
              <Title>Kayıt</Title>
            </Body>
          </Header>
          <RegisterForm navigation={this.props.navigation} />
        </React.Fragment>
    );
  }
}