import React from "react";
import { TouchableOpacity, ScrollView, Alert, TouchableHighlight } from "react-native";
import { Container, View, Text, Icon } from "native-base";
import { colors, routes } from "../../../../assets";
import styles from "./styles";
import moment from "moment";
import "moment/locale/pt-br";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import LinearGradient from "react-native-linear-gradient";

class DetalhesVisita extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visit: this.props.navigation.getParam("visit", ""),
      apiary: this.props.navigation.getParam("apiary", ""),
    };
  }

  // mostrar status de sincronização
  showStatus = () => {
    {
      this.state.visit.isSynced ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'Sua visita foi sincronizada com sucesso.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : this.state.visit.permanentlyFailed ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'A sincronização da visita falhou permanentemente. Por favor, delete a visita ou realize uma nova.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : 
      (
        Alert.alert(
          'Status de Sincronização',
          'Aguardando conexão com a internet para sincronizar a visita.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
    }
  };

  // deletar visita
  deleteVisit = () => {
    this.setState({ dialogVisible: false });
    Alert.alert(
      'Excluir Visita',
      'Tem certeza que deseja exlcuir essa Visita?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          this.props.deleteVisita({
            visita_id: this.state.visit.id,
            apiario_id: this.state.apiary.id,
          });
        }},
      ],
      {cancelable: false},
    );
  };

  render() {
    const visita = this.props.navigation.getParam("visit", "");
    const apiaryId = this.props.navigation.getParam("apiary", "").id;
    const apiaryName = this.props.navigation.getParam("apiary", "").nome;

    return (
      <Container>
        <HeaderCustomStack 
          title="Detalhes da Visita"
          description="Veja os detalhes da visita selecionada anteriormente"
          iconRight="delete"
          typeIconRight="AntDesign"
          handleIconRight={() => this.deleteVisit()}
        />
        <View style = {styles.viewContent}>

          {/* nome do apiário e status de sincronização */}
          <TouchableOpacity onPress = {() => this.showStatus()} style = {styles.viewTitle}>
            <Text style = {styles.apiaryName}>Visita ao {apiaryName}</Text>
            {
              visita.isSynced
              ? (<Icon type="AntDesign" name="checkcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> TRUE; visita.permanentlyFailed -> FALSE
              : visita.permanentlyFailed
              ? (<Icon type="AntDesign" name="closecircleo" style={styles.statusIconFailed} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> TRUE 
              : (<Icon type="AntDesign" name="clockcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> FALSE
            }
          </TouchableOpacity>

          {/* informações gerais sobre a visita realizada */}
          <View style = {styles.contentDetails}>
            <ScrollView contentContainerStyle = {{ width: '100%'}} showsVerticalScrollIndicator = {false}>
              <View style = {styles.cardInformation}>
                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="AntDesign" name="calendar" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Data</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{moment(visita.created_at).format("DD/MM/YYYY")}</Text>
                  </View>
                </View>

                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="AntDesign" name="cloudo" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Está sombreado?</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{visita && visita && visita.tem_sombra ? "Sim" : "Não"}</Text>
                  </View>
                </View>

                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="AntDesign" name="staro" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Tem água?</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{visita && visita && visita.tem_agua ? "Sim" : "Não"}</Text>
                  </View>
                </View>

                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="AntDesign" name="apple-o" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Tem comida?</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{visita && visita && visita.tem_comida ? "Sim" : "Não"}</Text>
                  </View>
                </View>
              </View>

              {/* informações sobre as colmeias analisadas */}
              <View style = {styles.cardInformationMore}>
                <View style = {styles.headerInformation}>
                  <Icon type="EvilIcons" name="archive" style = {styles.icons, {fontSize: 40, color: colors.theme_second}}/>
                  <View style = {styles.titles}>
                    <Text style = {styles.titleInformation}>Colmeias</Text>
                    <Text style = {styles.descriptionInformation}>Total de colmeias analisadas: {visita.visita_colmeias.length}</Text>
                  </View>
                </View>
                <View style = {styles.dataInformations}>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com postura</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_com_postura}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Sem postura</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_sem_postura}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com abelha morta</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_com_abelhas_mortas}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Sem abelha morta</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_sem_abelhas_mortas}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* informações sobre os quadros analisados */}
              <View style = {styles.cardInformationMore}>
                <View style = {styles.headerInformation}>
                  <Icon type="AntDesign" name="laptop" style = {styles.icons}/>
                  <View style = {styles.titles}>
                    <Text style = {styles.titleInformation}>Quadros</Text>
                    <Text style = {styles.descriptionInformation}>Total de quadros analisados: {visita.qtd_quadros_analizados}</Text>
                  </View>
                </View>
                <View style = {styles.dataInformations}>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com mel</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_quadros_mel}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com pólen</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_quadros_polen}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com cria aberta</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_cria_aberta}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com cria fechada</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_cria_fechada}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* observações realizadas */}
              <View style = {styles.cardInformationMore}>
                <View style = {styles.headerInformation}>
                  <Icon type="EvilIcons" name="navicon" style = {styles.icons, {fontSize: 40, color: colors.theme_second}}/>
                  <View style = {styles.titles}>
                    <Text style = {styles.titleInformation}>Observações</Text>
                    <Text style = {styles.descriptionInformation}>Observações feitas durante a visita</Text>
                  </View>
                </View>
                <View style = {styles.dataInformations}>
                  <View style = {styles.lineDataInformations}>
                    {
                      visita.observacao == null ? 
                      (
                        <Text style = {styles.textLineDataInformations}>Nenhuma observação importante foi feita durante a visita.</Text>
                      ) : (
                        <Text style = {styles.textLineDataInformations}>{visita.observacao + `                                                            `}</Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style = {{height: 100}}/>

            </ScrollView>
          </View>
        </View>
        {
          visita.visita_colmeias.length == 0
          ? (<View/>)
          : (
            <View style = {styles.viewButtonDetails}>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#ff8500"
                onPress={() => this.props.navigation.navigate(routes.DetalhesVisitaColmeia,{visita_colmeias: visita.visita_colmeias})}
                style = {{borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
              >
                <LinearGradient
                  colors={[colors.theme_default, colors.theme_second]}
                  style={{ height: '100%', borderRadius: 30}}
                >
                  <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 13, letterSpacing: 1, marginHorizontal: 30, marginTop: 15}}>DETALHAR POR COLMEIA</Text> 
                </LinearGradient>
              </TouchableHighlight>
            </View>
          )
        }
      </Container>
    );
  }
}

export default DetalhesVisita;
/* 
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
              {`Apiario ${apiaryName}`}
            </Text>
          </View>
          <Grid style={{ marginTop: 30 }}>
            {/* COLULA 1 }
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

            {/* COLULA 1 }

            {/* COLULA 2 }

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
            {/* COLULA 2 }
          </Grid>
          <View style={{ marginTop: 30, backgroundColor: "#E6E4E4" }}>
            <Text style={{ marginHorizontal: 10 }}>Dados das colmeias</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{ marginHorizontal: 10, fontWeight: "bold" }}
            >{`Colmeias visitadas:   ${visita.visita_colmeias}`}</Text>
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
 */