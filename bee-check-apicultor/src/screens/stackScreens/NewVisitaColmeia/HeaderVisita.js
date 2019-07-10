import React from "react";
import {
  Header,
  Left,
  Title,
  Right,
  Button,
  Text,
  Icon,
  Body,
  View
} from "native-base";
import { colors } from "../../../../assets";

const HeaderVisita = ({ handleConcluirVisita }) => (
  <Header
    style={{ backgroundColor: colors.theme_default }}
    androidStatusBarColor={colors.colorAndroidBarraStatus}
  >
    <Left />
    <Body>
      <Title style={{ color: colors.black }}>Visita</Title>
    </Body>
    <Right>
      <Button
        rounded
        style={{ backgroundColor: colors.btn_success }}
        iconRight
        small
        onPress={handleConcluirVisita}
      >
        <Text>Concluir visita</Text>
        <Icon type="FontAwesome" name="save" />
      </Button>
    </Right>
  </Header>
);

export default HeaderVisita;
