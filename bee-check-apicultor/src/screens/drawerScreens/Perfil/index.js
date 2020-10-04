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

/* 
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
        <Text>{this.state.token}</Text> */
