import React from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  View,
  Text,
  Grid,
  Col,
  Badge,
  CardItem,
  Textarea,
  Icon
} from "native-base";
import { HeaderCustom } from "../../../componentes";
import { images, colors, routes } from "../../../../assets";
import styles from "./styles";
import moment from "moment";
import "moment/locale/pt-br";

class DetalhesVisita extends React.Component {
  render() {
    const visita = this.props.navigation.getParam("visita", "");
    const apiario = this.props.navigation.getParam("apiario", "");

    return (
      <Container>
        <HeaderCustom title="Detalhes" />
        <Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: 10,
              marginHorizontal: 10,
              alignItems: "center",
              paddingTop: 10
            }}
          >
            <Image
              style={{ marginHorizontal: 10, width: 40, height: 40 }}
              source={images.home.apiario64}
            />
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={5}
              style={{
                color: "rgba(0, 0, 0, 0.59)",
                marginHorizontal: 20,
                fontWeight: "bold",
                fontSize: 17
              }}
            >
              {`Apiario ${apiario && apiario.nome}`}
            </Text>
          </View>
          <Grid style={{ marginTop: 30 }}>
            {/* COLULA 1 */}
            <Col style={{ marginHorizontal: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.label}>Data: </Text>
                <Text>{moment(visita.created_at).format("DD/MM/YYYY")}</Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.label}>Está sombreado: </Text>
                <Badge
                  style={
                    visita && visita && visita.tem_sombra
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.tem_sombra ? "SIM" : "NÃO"}
                  </Text>
                </Badge>
              </View>
            </Col>

            {/* COLULA 1 */}

            {/* COLULA 2 */}

            <Col style={{ marginHorizontal: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.label}>Há Água: </Text>
                <Badge
                  style={
                    visita && visita && visita.tem_agua
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.tem_agua ? "SIM" : "NÃO"}
                  </Text>
                </Badge>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.label}>Há comida: </Text>
                <Badge
                  style={
                    visita && visita && visita.tem_comida
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.tem_comida ? "SIM" : "NÃO"}
                  </Text>
                </Badge>
              </View>
            </Col>
            {/* COLULA 2 */}
          </Grid>
          <View style={{ marginTop: 30, backgroundColor: "#E6E4E4" }}>
            <Text style={{ marginHorizontal: 10 }}>Dados das colmeias</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{ marginHorizontal: 10, fontWeight: "bold" }}
            >{`Colmeias visitadas:   ${visita.visita_colmeias.length}`}</Text>
          </View>
          <Grid style={{ marginTop: 20 }}>
            <Col style={{ marginHorizontal: 5 }}>
              <View
                style={{
                  marginRight: 20,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelColmeias}>Colmeias com postura: </Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_colmeias_com_postura
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_colmeias_com_postura}
                  </Text>
                </Badge>
              </View>
              <View
                style={{
                  marginRight: 20,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelColmeias}>
                  Colmeias com abelhas mortas:
                </Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_colmeias_com_abelhas_mortas
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_colmeias_com_abelhas_mortas}
                  </Text>
                </Badge>
              </View>
            </Col>
            <Col style={{ marginHorizontal: 10 }}>
              <View
                style={{
                  marginRight: 30,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelColmeias}>Colmeias sem postura: </Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_colmeias_sem_postura
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_colmeias_sem_postura}
                  </Text>
                </Badge>
              </View>
              <View
                style={{
                  marginRight: 30,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelColmeias}>
                  Colmeias sem abelhas mortas:
                </Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_colmeias_sem_abelhas_mortas
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_colmeias_sem_abelhas_mortas}
                  </Text>
                </Badge>
              </View>
            </Col>
          </Grid>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{ marginHorizontal: 10, fontWeight: "bold" }}
            >{`Quadros analizados:   ${visita.qtd_quadros_analizados}`}</Text>
          </View>
          <Grid style={{ marginTop: 20 }}>
            <Col style={{ marginHorizontal: 5 }}>
              <View
                style={{
                  marginLeft: 30,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelQuadros}>Com Mel:</Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_quadros_mel
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_quadros_mel}
                  </Text>
                </Badge>
              </View>
              <View
                style={{
                  marginLeft: 30,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelQuadros}>Cria Aberta:</Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_cria_aberta
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_cria_aberta}
                  </Text>
                </Badge>
              </View>
            </Col>
            <Col style={{ marginHorizontal: 10 }}>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelQuadros}>Com Polén:</Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_quadros_polen
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_quadros_polen}
                  </Text>
                </Badge>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.labelQuadros}>Cria Fechada:</Text>
                <Badge
                  style={
                    visita && visita && visita.qtd_cria_fechada
                      ? styles.badge_success
                      : styles.badge_error
                  }
                >
                  <Text style={styles.badge_text}>
                    {visita && visita && visita.qtd_cria_fechada}
                  </Text>
                </Badge>
              </View>
            </Col>
          </Grid>
          <View style={{ marginTop: 30, backgroundColor: "#E6E4E4" }}>
            <Text style={{ marginHorizontal: 10 }}>Observações</Text>
          </View>
          <CardItem>
            <Textarea
              rowSpan={4}
              value={visita.observacao}
              editable={false}
              style={{ width: "100%", borderRadius: 5 }}
              bordered
            />
          </CardItem>
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "column-reverse",
              flex: 1,
              paddingEnd: 20,
              paddingBottom: 20,
              marginTop: 30
            }}
          >
            <View
              style={{
                backgroundColor: colors.theme_primary,
                width: 220,
                height: 45,
                borderRadius: 7
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingTop: 10
                }}
                onPress={() => this.props.navigation.navigate(routes.DetalhesVisitaColmeia,{visita_colmeias: visita.visita_colmeias})}
              >
                <Image
                  source={images.icons.colmeia}
                  style={{ width: 22, height: 22 }}
                />
                <Text>Detalhar por Colmeia</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default DetalhesVisita;
