import React, { Component } from 'react';
import { Text, View } from "react-native";
import { Callout } from 'react-native-maps';
import styles from './styles';
import { 
  Container,
  TitleContainer,
  Title,
  IconContainer,
} from './styles';

export default class MarkerCallOut extends Component {
  render() {
    const { nome } = this.props;

    return (
      <Callout tooltip={ true }>
        <View style = {styles.container}>
          <View style = {styles.titleContainer}>
            <Text>{nome}</Text>
          </View>
        </View>
      </Callout>  
    )
  }
}