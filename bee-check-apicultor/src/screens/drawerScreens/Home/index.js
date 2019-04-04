import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import {
  Container,
  Content,
  Card,
  Header,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import { colors } from "../../../../assets";
import styles from "./styles";
import { HeaderCustom, ButtonCustom, HeaderCard } from "../../../componentes";

export default class Home extends Component {
  render() {
    return (
      <Container>
        <HeaderCustom
          iconLeft="menu"
          typeIconLeft="MaterialCommunityIcons"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Home"
        />
        <Content padder>
          <Card style={{ flex: 0 }}>
            <HeaderCard
              style={styles.header}
              source={require("../../../../images/colonia.png")}
              title="Colmeias"
              note="Jan 10, 2019"
            />
            <CardItem>
              <Body>
                <Image
                  source={require("../../../../images/colmeiasHome1.jpg")}
                  style={styles.image}
                />
                <Text note style={{ padding: 5 }}>
                  Aqui você pode gerenciar todas as suas colmeias, podendo
                  tambem adicionar mais quando necessario.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <ButtonCustom
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Colmeia")}
                title="Ir para Colmeias"
                typeIconRight="MaterialCommunityIcons"
                iconRight="arrow-right"
              />
            </CardItem>
          </Card>
          <Card style={{ flex: 0 }}>
            <HeaderCard
              style={styles.header}
              source={require("../../../../images/visitaHomeIcon.png")}
              title="Visita"
              note="Jan 10, 2019"
            />
            <CardItem>
              <Body>
                <Image
                  source={require("../../../../images/visitaHome.jpg")}
                  style={styles.image}
                />
                <Text note style={{ padding: 5 }}>
                  Aqui você faz o monitoramento de seu apiario, respondendo um
                  pequeno questionario que irá lhe servir de base de dados para
                  acompanhamento e intervenções caso necessite.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <ButtonCustom
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Visita")}
                title="Realizar Visita"
                typeIconRight="MaterialCommunityIcons"
                iconRight="arrow-right"
              />
            </CardItem>
          </Card>
          <Card style={{ flex: 0 }}>
            <HeaderCard
              style={styles.header}
              source={require("../../../../images/intervencaoHomeIcon.png")}
              title="Intervenções"
              note="Jan 10, 2019"
            />
            <CardItem>
              <Body>
                <Image
                  source={require("../../../../images/intervencaoHome.jpg")}
                  style={styles.image}
                />
                <Text note style={{ padding: 5 }}>
                  Aqui você visualiza todas as recomendações passadas pelo
                  técnico responsavel pelo seu apiario.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <ButtonCustom
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Intervencao")}
                title="Realizar Intervenções"
                typeIconRight="MaterialCommunityIcons"
                iconRight="arrow-right"
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
