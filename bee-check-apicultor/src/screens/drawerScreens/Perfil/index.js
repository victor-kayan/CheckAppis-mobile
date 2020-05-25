import React, { Component } from "react";
import { colors, routes, images, constants } from "../../../../assets";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import ActionButton from "react-native-action-button";
import {
  login,
  logout,
  fetchDataUser
} from "../../../redux/actions/userActions";

import { TouchableOpacity, AsyncStorage } from "react-native";
import {
  Text,
  Container,
  View,
  Separator,
} from "native-base";

import {
  HeaderCustom,
} from "../../../componentes";
import "moment/locale/pt-br";
import styles from "./styles";


class Perfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',
      password: ''
    };
  }

  async componentDidMount() {
    var token = await AsyncStorage.getItem(
      `@beecheckApp:${constants.ACCESS_TOKEN}`
    );
    var email = await AsyncStorage.getItem(`@beecheckApp:${constants.USER_EMAIL}`);
    var password = await AsyncStorage.getItem(`@beecheckApp:${constants.USER_PASSWORD}`);
    this.setState({token: token, email: email, password: password})
  }

  render() {

    const { user, loading } = this.props;

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
            <View style={styles.userProfileText}>
              <Text style = {styles.heyText}>Olá,</Text>
              <Text style = {styles.userName}>!</Text>
            </View>
          </View>

        <Separator bordered>
          <Text style={styles.textDivider}>DADOS PESSOAIS</Text>
        </Separator>
        <View style = {styles.cardInformation}>
          <Text>Nome</Text>
          <Text style = {styles.textInformation}>Nome aqui</Text>
        </View>
        <View style = {styles.cardInformation}>
          <Text>Telefone</Text>
          <Text style = {styles.textInformation}>(84) 9 9895-2768</Text>
        </View>
        <Separator bordered>
          <Text style={styles.textDivider}>DADOS DE CADASTRO</Text>
        </Separator>
        <View style = {styles.cardInformation}>
          <Text>E-mail do usuário</Text>
          <Text style = {styles.textInformation}>{this.state.email}</Text>
        </View>
        <View style = {styles.cardInformation}>
          <Text>Senha</Text>
          <Text style = {styles.textInformation}>{this.state.password}</Text>
        </View>
        <Separator bordered>
          <Text style={styles.textDivider}>SOBRE O APLICATIVO</Text>
        </Separator>
        <View style = {styles.cardInformation}>
          <Text>Versão do aplicativo</Text>
          <Text style = {styles.textInformation}>Beta 1.0.0</Text>
        </View>
        <TouchableOpacity>
          <View style = {styles.cardInformation}>
              <Text>Desenvolvedores</Text>
              <Text style = {styles.textInformation}>Direcionar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style = {styles.cardInformation}>
              <Text>Política de privacidade</Text>
              <Text style = {styles.textInformation}>Direcionar</Text>
          </View>
        </TouchableOpacity>
        <Text>{this.state.token}</Text>
        </View>
      </Container>
    );
  }
}


export default (Perfil);

// function mapStateToProps(state, props) {
//   return {
//     name: state.nameState.name,
//     tell: state.tellState.tell,
//     email: state.emailState.email,
//     password: state.passwordState.password
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       login,
//       logout,
//       fetchDataUser
//     },
//     dispatch
//   );
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Perfil);
