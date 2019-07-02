import React, { Component } from "react";
import { Image } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  ActionSheet,
  Root,
  H3
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

var BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

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
      colmeiaState: [],
      done: false
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colmeias && this.state.done) {
      this.setState({ colmeiaState: nextProps.colmeias });
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
      colmeiaState
    } = this.state;

    return (
      <Container>
        <Header
          style={{ backgroundColor: colors.theme_default }}
          androidStatusBarColor={colors.colorAndroidBarraStatus}
        >
          <Body />
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
          <Root>
            <SpinnerCustom visible={loading} />
            <Card>
              <CardItem>
                <Button
                  style={{ width: '100%'}}
                  dark
                  transparent
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "Selecione uma Colmeia"
                      },
                      buttonIndex => {
                        this.setState({ clicked: BUTTONS[buttonIndex] });
                      }
                    )
                  }
                >
                  <Image
                    source={require("../../../../images/icons/colmeia128.png")}
                    style={styles.iconImagemSelectPicker}
                  />
                  <H3 style={{ fontSize: 15, marginStart: 5 }}>Selecione uma Colmeia</H3>
                  <Icon  style={{ marginRight: 0 }} type="Ionicons" name="md-arrow-dropdown" />
                </Button>
                {/* <Picker
                mode="dropdown"
                placeholder="Selecione uma colmeia"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={colmeia}
                onValueChange={colmeia =>
                  this.onValueChangeselectedPickerColmeia(colmeia)
                }
              >
                <Picker.Item
                  enabled={false}
                  key={null}
                  label={"Selecione uma Colmeia"}
                  value={null}
                />
                {!colmeiaState ? (
                  <Picker.Item note label={"Nenhuma Colmeia a ser visitada"} />
                ) : (
                  colmeiaState.map(colmeia => {
                    return (
                      <Picker.Item
                        key={colmeia.id}
                        label={colmeia.nome}
                        value={colmeia}
                      />
                    );
                  })
                )}
              </Picker> */}
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
            ) : (
              <CardItem>
                <Text style={styles.textSubTitle}>
                  Primeiro selecione uma colemia
                </Text>
              </CardItem>
            )}
          </Root>
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
