import React, { Component } from "react";
import { colors, routes, images, constants,} from "../../../../assets";
import { TouchableOpacity, AsyncStorage, ImageBackground, StatusBar, Image } from "react-native";
import { Text, Container, View } from "native-base";
import "moment/locale/pt-br";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";


class AboutApp extends Component {

  render() {
    const { user, loading } = this.props;

    return (
      <Container>
        <StatusBar backgroundColor={colors.theme_default} />

        <View style = {styles.container}>
        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: '100%'}}
        >
          <ImageBackground source={images.headers.hive} style = {{resizeMode: 'cover', flex: 1, opacity: 0.1}}/>
        </LinearGradient>

        <View style = {styles.viewInformations}>
          <Image source={images.sider.logo} style = {styles.logo}/>
          <Text style = {styles.version}>Version 1.10.197.20</Text>
          <Text style = {styles.copyright}>© 2017-2020 CheckAppis</Text>
          <Text style = {styles.ifrn}>IFRN - Campus Pau dos Ferros</Text>
          <TouchableOpacity onPress = {() => alert('Direcionar para a página')} style = {styles.buttonPolitics}>
            <Text style = {styles.textButton}>POLÍTICA DE PRIVACIDADE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => alert('Direcionar para a página')} style = {styles.buttonPolitics}>
            <Text style = {styles.textButton}>MANUAL DO APLICATIVO</Text>
          </TouchableOpacity>
        </View>
        
        </View>
      </Container>
    );
  }
}


export default (AboutApp);

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
