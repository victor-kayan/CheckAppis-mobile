import React, { Component } from "react";
import { Image, ImageBackground, Dimensions } from "react-native";
import { Container, Content, Card, CardItem, Text, Body } from "native-base";
import styles from "./styles";
import { HeaderCustom, ButtonCustom, HeaderCard } from "../../../componentes";
import { routes } from "../../../../assets";

export default class Home extends Component {
  render() {
    return (
      <Container>
        <HeaderCustom
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Home"
        />
        <Content>
          <Card style={{ flex: 0, elevation: 10 }}>
            <HeaderCard
              style={styles.header}
              source={require("../../../../images/home/colmeiaIcon.png")}
              title="Colmeias"
              note="Jan 10, 2019"
            />
            <CardItem>
              <Body>
                <Image
                  source={require("../../../../images/home/colmeiasImage.jpg")}
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
                onPress={() => this.props.navigation.navigate(routes.ColmeiaHome)}
                title="Ir para Colmeias"
                typeIconRight="MaterialCommunityIcons"
                iconRight="arrow-right"
              />
            </CardItem>
          </Card>
          <Card style={{ flex: 0 }}>
            <HeaderCard
              style={styles.header}
              source={require("../../../../images/home/visitaIcon.png")}
              title="Visita"
              note="Jan 10, 2019"
            />
            <CardItem>
              <Body>
                <Image
                  source={require("../../../../images/home/visitaImage.jpg")}
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
                onPress={() => this.props.navigation.navigate(routes.VisitasHome)}
                title="Realizar Visita"
                typeIconRight="MaterialCommunityIcons"
                iconRight="arrow-right"
              />
            </CardItem>
          </Card>
          <Card style={{ flex: 0 }}>
            <HeaderCard
              style={styles.header}
              source={require("../../../../images/home/intervencaoIcon.png")}
              title="Intervenções"
              note="Jan 10, 2019"
            />
            <CardItem>
              <Body>
                <Image
                  source={require("../../../../images/home/intervencaoImage.jpg")}
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
                onPress={() => this.props.navigation.navigate(routes.IntervencaoHome)}
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
