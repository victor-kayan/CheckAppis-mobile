import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActionButton from "react-native-action-button";
import {
  login,
  logout
} from "../../../redux/actions/userActions";

import {
  Text,
  Left,
  Button,
  Icon,
  Right,
  Container,
  Content,
  Card,
  CardItem,
  Picker,
  SwipeRow,
  View,
  Row,
  Badge,
  Separator
} from "native-base";

import {
  HeaderCustom,
} from "../../../componentes";
import "moment/locale/pt-br";
import styles from "./styles";
import { constants } from "../../../../assets";

class Perfil extends Component {

  render() {
    return (
      <Container>
        <HeaderCustom
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Perfil de Usuário"
          iconRight="sync"
          //handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <View style = {styles.container}>

          <View style = {styles.userProfile}>
            <View style = {styles.profilePhoto}></View>
            <View style={styles.userProfileText}>
              <Text style = {styles.heyText}>Olá,</Text>
              <Text style = {styles.userName}>{constants.USER_LOGGED}!</Text>
            </View>
          </View>

        <Separator bordered>
          <Text style={styles.textDivider}>DADOS PESSOAIS</Text>
        </Separator>
        <View>
          <Text>Nome</Text>
          <Text>Telefone</Text>
          <Text>Data de nascimento</Text>
          <Text>Sexo</Text>
        </View>
        <Separator bordered>
          <Text style={styles.textDivider}>DADOS DE CADASTRO</Text>
        </Separator>
        <View>
          <Text>Nome de usuário</Text>
          <Text>E-mail de recuperação</Text>
          <Text>Senha</Text>
        </View>
        <Separator bordered>
          <Text style={styles.textDivider}>SOBRE O APLICATIVO</Text>
        </Separator>
        <View>
          <Text>Versão do aplicativo</Text>
          <Text>Desenvolvedores</Text>
          <Text>Política de Privacidade</Text>
        </View>
        </View>
      </Container>
    );
  }
}


export default (Perfil);
