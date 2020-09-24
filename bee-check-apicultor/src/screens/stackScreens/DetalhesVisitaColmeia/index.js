import React from "react";
import { Container, Text, View } from "native-base";
import { Image, ScrollView, StatusBar } from "react-native";
import styles from "./styles";
import { images } from "../../../../assets";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import HiveDetails from "../../../componentes/HiveDetails";

class DetalhesVisitaColmeia extends React.Component {
  render() {
    const visita_colmeias = this.props.navigation.getParam("visita_colmeias", "");

    return (
      <Container>
        <HeaderCustomStack 
          title={`Detalhes da Visita`}
          description = "Veja as informações da visita separadas por colmeia analisada" 
        />
        <View style = {styles.container}>
          <Text style = {styles.title}>Detalhamento por colmeia</Text>
          <View style = {styles.contentHiveDetails}>
            <ScrollView contentContainerStyle = {{width: '100%', paddingHorizontal: 10,}}>
              {
                visita_colmeias && visita_colmeias.map (visitHive => {
                  return (
                    <HiveDetails
                      name = {visitHive.colmeia && visitHive.colmeia.nome}
                      description = {visitHive.colmeia && visitHive.colmeia.descricao}
                      mel = {visitHive.qtd_quadros_mel}
                      polen = {visitHive.qtd_quadros_polen}
                      aberta = {visitHive.qtd_cria_aberta}
                      fechada = {visitHive.qtd_cria_fechada}
                      vazio = {visitHive.qtd_quadros_vazios}
                      postura = {visitHive.is_postura}
                      morta = {visitHive.is_abelhas_mortas}
                      zangao = {visitHive.tem_zangao}
                      realeira = {visitHive.tem_realeira}
                      obs = {visitHive.observacao}
                      key = {visitHive.id}
                      visitHive = {visitHive}
                    />
                  );
                })
              }
              <View style = {{height: 200}}/>
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

export default DetalhesVisitaColmeia;


{/* <Content padder>
          {visita_colmeias &&
            visita_colmeias.map(visita => {
              return (
                <Card key={visita.id} style={{ paddingRight: 10 }}>
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
                    >{`Dados das faces do quadro:`}</Text>
                  </View>
                  <Grid>
                    <Col style={{ marginHorizontal: 5 }}>
                      <View style={styles.itemContainer} >
                        <Text style={styles.text}>Com mel</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_quadros_mel}
                          </Text>
                        </Badge>
                      </View>

                      <View style={styles.itemContainer} >
                        <Text style={styles.text}>Cria aberta</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_cria_aberta}
                          </Text>
                        </Badge>
                      </View>
                      
                      <View style={styles.itemContainer} >
                        <Text style={styles.text}>Vazios</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_quadros_vazios}
                          </Text>
                        </Badge>
                      </View>

                      <View style={{ marginVertical: 15 }} />

                      <View style={styles.itemContainer} >
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

                      <View style={styles.itemContainer} >
                        <Text style={styles.text}>Realeira</Text>
                        <Badge
                          style={
                            visita.tem_realeira
                              ? styles.badge_success
                              : styles.badge_error
                          }
                        >
                          <Text style={styles.badge_text}>
                            {visita.tem_realeira ? "SIM" : "NÃO"}
                          </Text>
                        </Badge>
                      </View>
                    </Col>
                    <Col style={{ marginHorizontal: 5 }}>
                    <View style={styles.itemContainer} >
                        <Text style={styles.text}>Com polén</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_quadros_polen}
                          </Text>
                        </Badge>
                      </View>

                      <View style={styles.itemContainer} >
                        <Text style={styles.text}>Cria fechada</Text>
                        <Badge style={styles.badge_success}>
                          <Text style={styles.badge_text}>
                            {visita.qtd_cria_fechada}
                          </Text>
                        </Badge>
                      </View>

                      <View style={{ marginVertical: 40 }} />

                      <View style={styles.itemContainer} >
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

                      <View style={styles.itemContainer} >
                          <Text style={styles.text}>Zangão</Text>
                          <Badge
                            style={
                              visita.tem_zangao
                                ? styles.badge_success
                                : styles.badge_error
                            }
                          >
                            <Text style={styles.badge_text}>
                              {visita.tem_zangao ? "SIM" : "NÃO"}
                            </Text>
                          </Badge>
                        </View>
                      </Col>

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
 */}