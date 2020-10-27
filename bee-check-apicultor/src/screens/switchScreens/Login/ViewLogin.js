import React from "react";
import { 
  ImageBackground, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  Image
} from "react-native";

import {
  Icon,
  Container,
  Text,
  View,
  Spinner
} from "native-base";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from "react-native-linear-gradient";
import { colors, images } from "../../../../assets";
import styles from "./styles";

const ViewLogin = ({
  error,
  message,
  email,
  handleEmail,
  password,
  handlePassword,
  handleLogin,
  loading,
  goToOnboarding,
  ...rest
}) => (
  <Container style = {{flex: 1, height: '100%'}}>
    <StatusBar backgroundColor={colors.theme_default} />
    <View style = {styles.contentImage}>
        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: '100%', width: '100%', flexDirection: 'row'}}
        >
        <ImageBackground source={images.home.cover} style={styles.coverImage}/>
        <Image source={images.login.logo} style = {styles.logo}/>
        <Text style = {styles.welcome}>Bem-vindo(a)!</Text>
        <Text style = {styles.welcomeText}>{`O CheckAppis é a forma mais fácil e\nrápida de gerenciar seu apiário.`}</Text>
      </LinearGradient>
    </View>
    <View style = {styles.loginView}>
      <Text style = {styles.accessText}>ACESSE SUA CONTA</Text>

      <View style = {styles.viewInput}>
        <Icon type="FontAwesome5" name="user-alt" style = {styles.iconInputi}/>
        <TextInput
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          value={email}
          placeholder="E-mail"
          keyboardType="email-address"
          returnKeyType="next"
          style={styles.input}
          placeholderTextColor={"#B8B8B8"}
          onChangeText={handleEmail}
          blurOnSubmit={false}
          onSubmitEditing={() => {this.passwordInput.focus()}}
        />
      </View>
      <View style = {styles.viewInput}>
        <Icon type="FontAwesome" name="lock" style = {styles.iconInput}/>
        <TextInput
          ref={(input) => {this.passwordInput = input}}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Senha"
          returnKeyType="done"
          style={styles.input}
          placeholderTextColor={"#B8B8B8"}
          value={password}
          onChangeText={handlePassword}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style = {styles.loginButton}>
        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: '100%', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
        >
          <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: wp('3.6%') }}>E N T R A R</Text>
          {loading ? (
            <Spinner color="white" style={styles.spinnerButton} />
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    </View>
    <View style = {styles.content}>
      <Text style = {styles.forgotText}>Esqueci minha senha</Text>
      <Text style = {styles.notText}>{`Não está cadastrado?\nEntre em contato com um técnico.`}</Text>
      <TouchableOpacity onPress={goToOnboarding}>
        <Text style = {styles.notText}>Ver apresentação do CheckAppis novamente.</Text>
      </TouchableOpacity>
    </View>
  </Container>
);

export default ViewLogin;
