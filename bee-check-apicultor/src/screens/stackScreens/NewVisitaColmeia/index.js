import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import {
  Container,
  Content,
  Card,
  Left,
  Icon,
  Right,
  CardItem,
  Picker,
  Text,
  View,
  Textarea,
  Header,
  Button,
  Body,
  Root,
  H3,
  Title,
  Thumbnail
} from "native-base";
import { getColemiasByApiario } from "../../../redux/actions/colmeiaActions";
import { createVisitaColmeia } from "../../../redux/actions/visitaColmeiaActions";
import {
  SpinnerCustom,
  InputNumeric,
  InputSwitch,
  ButtonCustom
} from "../../../componentes";
import { colors } from "../../../../assets";

const imageColmeia128 = require("../../../../images/icons/colmeia128.png");

class NewVisitaColmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmeia: null,
      qtd_quadros_mel: 0,
      qtd_quadros_polen: 0,
      tem_abelhas_mortas: 1,
      qtd_cria_aberta: 0,
      qtd_cria_fechada: 0,
      tem_postura: 1,
      visita_apiario_id: 0,
      observacao: "",
      colmeiasState: [],
      colmeiasVisitadas: [],
      done: false
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  renderItemColmeia = colmeias => {
    let colmeiasAux = ["cancelar"];
    colmeias.forEach((colmeia, index) => {
      colmeiasAux.push(
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 30
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Thumbnail square small source={{ uri: colmeia.foto }} />
            <Text style={{ paddingHorizontal: 15 }}>
              {colmeia.nome ? colmeia.nome : `Colmeia ${index}`}
            </Text>
          </View>
          <Icon
            style={{
              color: this.state.colmeiasVisitadas.includes(colmeia.id)
                ? colors.btn_success
                : // : "#FAFAFA"
                  colors.btn_success
            }}
            name="check-square-o"
            type="FontAwesome"
          />
        </View>
      );
    });
    this.setState({ colmeiasState: colmeiasAux });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.colmeias && this.state.done) {
      this.renderItemColmeia(nextProps.colmeias);
    }
  }

  handleRefresh = () => {
    this.props.getColemiasByApiario({
      id: this.props.navigation.getParam("apiario_id", "")
    });
    this.setState({ colmeia: null, done: true });
  };

  onSaveVisita = () => {
    let tem_abelhas_mortas = this.state.tem_abelhas_mortas == 1 ? 0 : 1;
    let tem_postura = this.state.tem_postura == 1 ? 0 : 1;

    const {
      qtd_quadros_mel,
      qtd_quadros_polen,
      qtd_cria_aberta,
      qtd_cria_fechada,
      colmeia,
      observacao
    } = this.state;
    // this.props.createVisitaColmeia({
    //   qtd_quadros_mel,
    //   qtd_quadros_polen,
    //   tem_abelhas_mortas,
    //   qtd_cria_aberta,
    //   qtd_cria_fechada,
    //   tem_postura,
    //   visita_apiario_id: this.props.visitaApiario.id,
    //   colmeia_id: colmeia.id,
    //   observacao
    // });

    this.clearState();
  };

  clearState = () => {
    this.setState({
      colmeia: null,
      qtd_quadros_mel: 0,
      qtd_quadros_polen: 0,
      tem_abelhas_mortas: 1,
      qtd_cria_aberta: 0,
      qtd_cria_fechada: 0,
      tem_postura: 1,
      visita_apiario_id: 0,
      observacao: ""
    });
  };

  onValueChangeselectedPickerColmeia = colmeia => {
    this.setState({ colmeia });
  };

  showActionSheet = () => {
    const { colmeiasState } = this.state;

    colmeiasState && colmeiasState.length > 0 && this.ActionSheet.show();
  };

  render() {
    const { loading } = this.props;
    const {
      colmeia,
      qtd_quadros_mel,
      qtd_quadros_polen,
      tem_abelhas_mortas,
      qtd_cria_aberta,
      qtd_cria_fechada,
      tem_postura,
      observacao,
      colmeiasState
    } = this.state;
    return (
      <Container>
        <Header
          style={{ backgroundColor: colors.theme_default }}
          androidStatusBarColor={colors.colorAndroidBarraStatus}
        >
          <Left />
          <Body>
            <Title style={{ color: colors.black }}>Colmeias</Title>
          </Body>
          <Right>
            <Button
              rounded
              style={{ backgroundColor: colors.btn_success }}
              iconRight
              small
            >
              <Text>Concluir visita</Text>
              <Icon type="FontAwesome" name="save" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          {/* <Root> */}
          <SpinnerCustom visible={loading} />
          <Card>
            <CardItem>
              <Button
                style={{ width: "100%" }}
                dark
                transparent
                onPress={this.showActionSheet}
              >
                <Image
                  source={require("../../../../images/icons/colmeia128.png")}
                  style={styles.iconImagemSelectPicker}
                />
                <H3
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    marginLeft: 5
                  }}
                >
                  Selecione uma Colmeia
                </H3>
                <Icon
                  style={{
                    alignSelf: "flex-end"
                  }}
                  type="Ionicons"
                  name="md-arrow-dropdown"
                />
              </Button>
              <ActionSheet
                ref={o => (this.ActionSheet = o)}
                title={"Selecione uma colmeia!"}
                options={colmeiasState}
                cancelButtonIndex={0}
                // destructiveButtonIndex={1}
                onPress={index => {
                  alert(index);
                }}
              />
            </CardItem>
          </Card>
          {colmeia ? (
            <View>
              <CardItem>
                <Text style={styles.textSubTitle}>
                  Responda as questões abaixo sobre a colmeia{" "}
                  {this.state.colmeia && this.state.colmeia.nome}
                </Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Há quantos quadros de Mel?</Text>
                </Left>
                <Right>
                  <InputNumeric
                    value={qtd_quadros_mel}
                    onChangePlus={() =>
                      this.setState({ qtd_quadros_mel: qtd_quadros_mel + 1 })
                    } // this is necessary for this component
                    onChangeMinus={() =>
                      this.setState({
                        qtd_quadros_mel:
                          qtd_quadros_mel <= 0
                            ? qtd_quadros_mel
                            : qtd_quadros_mel - 1
                      })
                    }
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Há quantos quadros de Pólen?</Text>
                </Left>
                <Right>
                  <InputNumeric
                    value={qtd_quadros_polen}
                    onChangePlus={() =>
                      this.setState({
                        qtd_quadros_polen: qtd_quadros_polen + 1
                      })
                    } // this is necessary for this component
                    onChangeMinus={() =>
                      this.setState({
                        qtd_quadros_polen:
                          qtd_quadros_polen <= 0
                            ? qtd_quadros_polen
                            : qtd_quadros_polen - 1
                      })
                    }
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Há quantos quadros de cria Aberta?</Text>
                </Left>
                <Right>
                  <InputNumeric
                    value={qtd_cria_aberta}
                    onChangePlus={() =>
                      this.setState({ qtd_cria_aberta: qtd_cria_aberta + 1 })
                    } // this is necessary for this component
                    onChangeMinus={() =>
                      this.setState({
                        qtd_cria_aberta:
                          qtd_cria_aberta <= 0
                            ? qtd_cria_aberta
                            : qtd_cria_aberta - 1
                      })
                    }
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Há quantos quadros de cria Fechada?</Text>
                </Left>
                <Right>
                  <InputNumeric
                    value={qtd_cria_fechada}
                    onChangePlus={() =>
                      this.setState({
                        qtd_cria_fechada: qtd_cria_fechada + 1
                      })
                    } // this is necessary for this component
                    onChangeMinus={() =>
                      this.setState({
                        qtd_cria_fechada:
                          qtd_cria_fechada <= 0
                            ? qtd_cria_fechada
                            : qtd_cria_fechada - 1
                      })
                    }
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Há abelhas mortas no Alavo?</Text>
                </Left>
                <Right>
                  <InputSwitch
                    value={tem_abelhas_mortas}
                    onValueChange={tem_abelhas_mortas =>
                      this.setState({ tem_abelhas_mortas })
                    } // this is necessary for this component
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Há presença de Postura?</Text>
                </Left>
                <Right>
                  <InputSwitch
                    value={tem_postura}
                    onValueChange={tem_postura =>
                      this.setState({ tem_postura })
                    } // this is necessary for this component
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Textarea
                  rowSpan={4}
                  value={observacao}
                  onChangeText={observacao => this.setState({ observacao })}
                  style={{ width: "100%", borderRadius: 5 }}
                  bordered
                  placeholder="Observações"
                />
              </CardItem>
              <CardItem style={{ alignSelf: "flex-end" }}>
                <ButtonCustom
                  style={styles.buttonSalveVisita}
                  onPress={() => this.onSaveVisita()}
                  title="Proxima Colmeia"
                  iconRight="arrowright"
                  typeIconRight="AntDesign"
                />
              </CardItem>
            </View>
          ) : !loading && colmeiasState.length ? (
            <>
              <CardItem
                style={{
                  marginTop: 20,
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Text>Primeiro selecione uma Colmeia</Text>
              </CardItem>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image source={imageColmeia128} />
              </View>
            </>
          ) : (
            !loading && (
              <>
                <CardItem
                  style={{
                    marginTop: 20,
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Text>Nenhuma colmeia cadastrada</Text>
                </CardItem>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    onPress={() =>
                      this.props.navigation.navigate("NewColmeia", {
                        apiario_id: this.props.navigation.getParam(
                          "apiario_id",
                          ""
                        )
                      })
                    }
                    style={{ color: colors.btn_success, marginLeft: 130 }}
                    active
                    type="AntDesign"
                    name="pluscircle"
                  />
                  <Image source={imageColmeia128} />
                </View>
              </>
            )
          )}
          {/* </Root> */}
        </Content>
      </Container>
    );
  }
}

// export default Visita;
function mapStateToProps(state) {
  return {
    loading: state.colmeiaState.loading || state.visitaColmeiaState.loading,
    colmeias: state.colmeiaState.colmeias,
    visitaApiario: state.visitaApiarioState.visitaApiario
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getColemiasByApiario, createVisitaColmeia },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVisitaColmeia);
