import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import ActionButton from "react-native-action-button";
import {
  login,
  logout,
  fetchDataUser
} from "../../../redux/actions/userActions";

import { TouchableOpacity } from "react-native";
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
  Separator,
} from "native-base";

import {
  HeaderCustom,
} from "../../../componentes";
import "moment/locale/pt-br";
import styles from "./styles";
import { constants } from "../../../../assets";

class Perfil extends Component {

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
            <View style = {styles.profilePhoto}></View>
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
          <Text style = {styles.textInformation}>sadraklyon@gmail.com</Text>
        </View>
        <View style = {styles.cardInformation}>
          <Text>Senha</Text>
          <Text style = {styles.textInformation}>sadrak123</Text>
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
