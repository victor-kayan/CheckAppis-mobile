import React from "react";
import moment from "moment";
import "moment/locale/pt-br";

import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Right,
  Badge,
  Left,
  Thumbnail,
  View,
  Grid,
  Col
} from "native-base";
import { HeaderCustom } from "../../../componentes";
import styles from "./styles";
import { colors } from "../../../../assets";

class DetalhesVisitaColmeia extends React.Component {
  render() {
    const visita_colmeias = this.props.navigation.getParam(
      "visita_colmeias",
      ""
    );

    return (
      <Container>
        <HeaderCustom title="Detalhes" />
        <Content padder>
          {visita_colmeias &&
            visita_colmeias.map(visita => {
              return (
                <Card key={visita.id}>
                  <CardItem
                    header
                    style={{
                      backgroundColor: "#FCFCFC",
                      borderBottomColor: "rgba(0, 0, 0, 0.05)",
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                      borderBottomWidth: 2
                    }}
                  >
                    <Left>
                      <Thumbnail
                        style={{
                          borderRadius: 6,
                          borderColor: "rgba(0, 0, 0, 0.19)",
                          borderWidth: 1
                        }}
                        source={{ uri: visita.colmeia.foto }}
                      />
                      <Body>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                            Nome:{" "}
                          </Text>
                          <Text style={{ fontSize: 13 }}>
                            {visita.colmeia && visita.colmeia.nome}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                            Descricão:{" "}
                          </Text>
                          <Text style={{ fontSize: 13 }}>
                            {visita.colmeia && visita.colmeia.descricao}
                          </Text>
                        </View>
                      </Body>
                    </Left>
                  </CardItem>
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{ marginHorizontal: 10, fontWeight: "bold", fontSize: 13 }}
                    >{`Dados dos quadros:`}</Text>
                  </View>
                  <Grid>
                    {/* COLULA 1 */}
                    <Col style={{ marginHorizontal: 5 }}>
                      <CardItem style={styles.cardItem}>
                        <Text style={styles.text}>Com mel</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_quadros_mel}
                          </Text>
                        </Badge>
                      </CardItem>
                      <CardItem style={styles.cardItem}>
                        <Text style={styles.text}>Cria aberta</Text>
                        <Right>
                          <Badge style={styles.badge_success}>
                            <Text style={styles.badge_text}>
                              {visita.qtd_cria_aberta}
                            </Text>
                          </Badge>
                        </Right>
                      </CardItem>
                      <CardItem style={styles.cardItem}>
                        <Text style={styles.text}>Postura </Text>
                        <Right>
                          <Badge
                            style={
                              visita.is_postura
                                ? styles.badge_success
                                : styles.badge_error
                            }
                          >
                            <Text style={styles.badge_text}>
                              {visita.is_postura ? "S" : "N"}
                            </Text>
                          </Badge>
                        </Right>
                      </CardItem>
                    </Col>
                    {/* COLULA 1 */}
                    {/* COLULA 2 */}
                    <Col style={{ marginHorizontal: 5 }}>
                      <CardItem style={styles.cardItem}>
                        <Text style={styles.text}>Com polén</Text>
                        <Right>
                          <Badge style={styles.badge_success}>
                            <Text style={styles.badge_text}>
                              {visita.qtd_quadros_polen}
                            </Text>
                          </Badge>
                        </Right>
                      </CardItem>
                      <CardItem style={styles.cardItem}>
                        <Text style={styles.text}>Cria fechada</Text>
                        <Right>
                          <Badge style={styles.badge_success}>
                            <Text style={styles.badge_text}>
                              {visita.qtd_cria_fechada}
                            </Text>
                          </Badge>
                        </Right>
                      </CardItem>
                      <CardItem style={styles.cardItem}>
                        <Text style={styles.text}>Abelhas mortas </Text>
                        <Right>
                          <Badge
                            style={
                              visita.is_abelhas_mortas
                                ? styles.badge_success
                                : styles.badge_error
                            }
                          >
                            <Text style={styles.badge_text}>
                              {visita.is_abelhas_mortas ? "S" : "N"}
                            </Text>
                          </Badge>
                        </Right>
                      </CardItem>
                    </Col>
                    {/* COLULA 2 */}
                  </Grid>
                </Card>
              );
            })}
        </Content>
      </Container>
    );
  }
}

export default DetalhesVisitaColmeia;
