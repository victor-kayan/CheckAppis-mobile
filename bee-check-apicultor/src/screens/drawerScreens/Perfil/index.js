import React, { Component } from "react";
import { StatusBar, Image } from "react-native";

import { connect } from "react-redux";

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text, Container, View, Icon } from "native-base";
import { HeaderCustom } from "../../../componentes";
import { colors } from "../../../../assets";
import styles from "./styles";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatAddress = () => {
    const { endereco } = this.props.user;
    const { cidade } = endereco;

    return `${endereco.logradouro}, ${cidade.nome}/${cidade.uf}`;
  }

  render() {
    const { user } = this.props;

    return (
      <Container>
        <StatusBar backgroundColor={colors.theme_default} />
        <HeaderCustom
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Meu Perfil"
        />
        <View style = {styles.container}>
          <View style = {styles.cardInformation}>
            <View style = {styles.viewIcon}>
              { typeof(user.foto) === 'string' ? (
                  <Image source={{ uri: user.foto }} style={styles.userImage} />
                ) : (
                  <Icon type="AntDesign" name="user" style={{color: colors.blackgrey, fontSize: 50,}} active/>
                )
              }
            </View>
            <View>
              <Text style = {styles.name}>{user.name}</Text>
              <Text style = {styles.email}>{user.email}</Text>
            </View>
          </View>
          <View style = {styles.viewCompleteInformations}>
            <View style = {styles.lineInformation}>
              <Icon type="AntDesign" name="phone" style={{color: colors.theme_second, marginRight: 16, fontSize: wp('6.1%')}} active/>
              <Text style = {styles.textInformationLine}>{user.telefone}</Text>
            </View>
            <View style = {styles.lineInformation}>
              <Icon type="AntDesign" name="enviromento" style={{color: colors.theme_second, marginRight: 16, fontSize: wp('6.1%')}} active/>
              <Text style = {styles.textInformationLine}>{this.formatAddress()}</Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.userState.user,
  };
}

export default connect(
  mapStateToProps,
  null
)(Perfil);