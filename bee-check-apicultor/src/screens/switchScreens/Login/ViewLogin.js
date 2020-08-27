import React from "react";
import { ImageBackground, Image, Dimensions, TouchableOpacity, StatusBar} from "react-native";
import {
  Item,
  Input,
  Icon,
  Button,
  Container,
  Text,
  Content,
  Card,
  Form,
  View,
  Spinner
} from "native-base";
import { Alert, HeaderCustom } from "../../../componentes";
import { colors, images } from "../../../../assets";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

let { height } = Dimensions.get("window");

const ViewLogin = ({
  error,
  message,
  email,
  handleEmail,
  password,
  handlePassword,
  handleLogin,
  loading,
  ...rest
}) => (
  <Container>
    <StatusBar backgroundColor={colors.theme_default} />
    <View style = {styles.contentImage}>
        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: '100%', width: '100%'}}
        >
        <ImageBackground source={images.home.cover} style={styles.coverImage}/>
      <Text style = {styles.welcome}>Bem-vindo(a)!</Text>
      <Text style = {styles.welcomeText}>{`O CheckAppis é a forma mais fácil e\nrápida de gerenciar seu apiário.`}</Text>
      </LinearGradient>
    </View>
    <View style = {styles.content}>
      <Text style = {styles.notText}>{`Não está cadastrado?\nEntre em contato com um técnico.`}</Text>
    </View>
    <View style = {styles.loginView}>
      <Text style = {styles.accessText}>ACESSE SUA CONTA</Text>


      <View style = {styles.viewInput}>
        <Icon type="FontAwesome5" name="user-alt" style = {styles.iconInputi}/>
        <Input
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          value={email}
          placeholder="E-mail"
          style={styles.input}
          placeholderTextColor={"#B8B8B8"}
          onChangeText={handleEmail}
        />
      </View>
      <View style = {styles.viewInput}>
        <Icon type="FontAwesome" name="lock" style = {styles.iconInput}/>
        <Input
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          placeholder="Senha"
          style={styles.input}
          placeholderTextColor={"#B8B8B8"}
          value={password}
          onChangeText={handlePassword}
        />
      </View>


      <Text style = {styles.forgotText}>Esqueci minha senha</Text>

      <TouchableOpacity onPress={handleLogin} style = {styles.loginButton}>
        <LinearGradient
          colors={[colors.theme_default, colors.theme_second]}
          style={{ height: '100%', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
        >
          <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 14 }}>E N T R A R</Text>
          {loading ? (
            <Spinner color="white" style={styles.spinnerButton} />
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  </Container>
);

export default ViewLogin;

// {/* <Card transparent style={styles.cardContainer}>
//           {error ? <Alert type="error" message={message} /> : null}
//           <Form>
//             <Item last style={{ marginTop: 25 }}>
//               <Icon active type="Entypo" name="email" style={styles.icon} />
//               <Input
//                 underlineColorAndroid="transparent"
//                 autoCapitalize="none"
//                 value={email}
//                 placeholder="e-mail"
//                 style={styles.input}
//                 placeholderTextColor={"#B8B8B8"}
//                 onChangeText={handleEmail}
//               />
//             </Item>
//             <Item last>
//               <Icon active name="key" style={styles.icon} />
//               <Input
//                 secureTextEntry={true}
//                 underlineColorAndroid="transparent"
//                 autoCapitalize="none"
//                 placeholder="senha"
//                 style={styles.input}
//                 placeholderTextColor={"#B8B8B8"}
//                 value={password}
//                 onChangeText={handlePassword}
//               />
//             </Item>
//             <Button full style={styles.button} onPress={handleLogin}>
//               <Text style={styles.textButton}>Entrar</Text>
//               {loading ? (
//                 <Spinner color="black" style={styles.spinnerButton} />
//               ) : null}
//             </Button>
//           </Form>
//         </Card> */}
