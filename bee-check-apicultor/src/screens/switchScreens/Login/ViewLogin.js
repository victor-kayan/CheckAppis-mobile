import React from "react";
import { ImageBackground, Image, Dimensions} from "react-native";
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
import { Alert } from "../../../componentes";
import { colors, images } from "../../../../assets";
import styles from "./styles";

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
    <ImageBackground
      source={images.login.background}
      style={[styles.backgroundImage, { height: height }]}
    >
      <Content padder>
        <Card transparent style={styles.cardContainer}>
          <View style={styles.view}>
            <Image source={images.logo} />
            <View style={styles.logoName}>
              <Text style={styles.textLogoBee}>Bee</Text>
              <Text style={styles.textLogoCheck} note>
                Check
              </Text>
            </View>
          </View>
          {error ? <Alert type="error" message={message} /> : null}
          <Form>
            <Item last style={{ marginTop: 25 }}>
              <Icon active type="Entypo" name="email" style={styles.icon} />
              <Input
                autoFocus
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                value={email}
                placeholder="email"
                style={styles.input}
                placeholderTextColor={colors.white}
                onChangeText={handleEmail}
              />
            </Item>
            <Item last>
              <Icon active name="key" style={styles.icon} />
              <Input
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="senha"
                style={styles.input}
                placeholderTextColor={colors.white}
                value={password}
                onChangeText={handlePassword}
              />
            </Item>
            <Button full style={styles.button} onPress={handleLogin}>
              <Text style={styles.textButton}>Entrar</Text>
              {loading ? (
                <Spinner color="black" style={styles.spinnerButton} />
              ) : null}
            </Button>
          </Form>
        </Card>
      </Content>
    </ImageBackground>
  </Container>
);

export default ViewLogin;
