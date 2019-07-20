import React from "react";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Badge,
  Left,
  Thumbnail,
  View,
  Grid,
  Col,
  Textarea
} from "native-base";
import { HeaderCustom } from "../../../componentes";
import styles from "./styles";
import { images } from "../../../../assets";

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
                        source={
                          visita.colmeia && visita.colmeia.foto
                            ? { uri: visita.colmeia.foto }
                            : images.fotoDefault
                        }
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
                      style={{
                        marginHorizontal: 10,
                        fontWeight: "bold",
                        fontSize: 13
                      }}
                    >{`Dados dos quadros:`}</Text>
                  </View>
                  <Grid>
                    {/* COLULA 1 */}
                    <Col style={{ marginHorizontal: 5 }}>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text style={styles.text}>Com mel</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_quadros_mel}
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
                        <Text style={styles.text}>Cria aberta</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_cria_aberta}
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
                        <Text style={styles.text}>Postura </Text>
                        <Badge
                          style={
                            visita.is_postura
                              ? styles.badge_success
                              : styles.badge_error
                          }
                        >
                          <Text style={styles.badge_text}>
                            {visita.is_postura ? "SIM" : "NÃO"}
                          </Text>
                        </Badge>
                      </View>
                    </Col>
                    {/* COLULA 1 */}
                    {/* COLULA 2 */}
                    <Col style={{ marginHorizontal: 5 }}>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text style={styles.text}>Com polén</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_quadros_polen}
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
                        <Text style={styles.text}>Cria fechada</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_cria_fechada}
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
                        <Text style={styles.text}>Abelhas mortas </Text>
                        <Badge
                          style={
                            visita.is_abelhas_mortas
                              ? styles.badge_success
                              : styles.badge_error
                          }
                        >
                          <Text style={styles.badge_text}>
                            {visita.is_abelhas_mortas ? "SIM" : "NÃO"}
                          </Text>
                        </Badge>
                      </View>
                    </Col>
                    {/* COLULA 2 */}
                  </Grid>
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontWeight: "bold",
                        fontSize: 13
                      }}
                    >{`Observações:`}</Text>
                  </View>
                  <CardItem>
                    <Textarea
                      rowSpan={3}
                      value={visita.observacao}
                      editable={false}
                      style={{ width: "100%", borderRadius: 5 }}
                      bordered
                    />
                  </CardItem>
                </Card>
              );
            })}
        </Content>
      </Container>
    );
  }
}

export default DetalhesVisitaColmeia;
