import React, { Component } from "react";
import { colors, routes, images, constants } from "../../../../assets";
import { StatusBar} from "react-native";
import { Text, Container, View, Separator, Icon } from "native-base";
import { HeaderCustom } from "../../../componentes";
import "moment/locale/pt-br";
import styles from "./styles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Perfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',
      password: ''
    };
  }

  render() {
    const { user, loading } = this.props;

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
              <Icon type="AntDesign" name="user" style={{color: colors.blackgrey, fontSize: 50,}} active/>
            </View>
            <View>
              <Text style = {styles.name}>Cláudio Rodrigo</Text>
              <Text style = {styles.email}>claudio@gmail.com</Text>
            </View>
          </View>
          <View style = {styles.viewCompleteInformations}>
            <View style = {styles.lineInformation}>
              <Icon type="AntDesign" name="phone" style={{color: colors.theme_second, marginRight: 16, fontSize: wp('6.1%')}} active/>
              <Text style = {styles.textInformationLine}>(84) 9 9687-5033</Text>
            </View>
            <View style = {styles.lineInformation}>
              <Icon type="AntDesign" name="enviromento" style={{color: colors.theme_second, marginRight: 16, fontSize: wp('6.1%')}} active/>
              <Text style = {styles.textInformationLine}>Endereço aqui dessa forma</Text>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}


export default (Perfil);