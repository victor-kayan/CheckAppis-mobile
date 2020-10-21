import React, { Component } from 'react';
import { Text, View, Button } from "react-native";
import { Callout } from 'react-native-maps';
import styles from './styles';

export default class MarkerCallOut extends Component {
  render() {
    const { apiario } = this.props;
    const { nome, descricao } = apiario;
    const { logradouro, cidade } = apiario.endereco;

    return (
      <Callout tooltip={true}>
        <View style = {styles.container}>
          <View style = {styles.header}>
            <Text style={styles.title}>{nome}</Text>
            <Text style={styles.description}>{descricao}</Text>
          </View>
          <View style={styles.addressContainer}>
            <Text style={{...styles.address, marginBottom: 3}}>{logradouro}</Text>
            <Text style={styles.address}>{`${cidade.nome}/${cidade.uf}`}</Text>
          </View>
        </View>
      </Callout>  
    )
  }
}