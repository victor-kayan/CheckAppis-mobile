import React, { Component } from "react";
import { Image } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";
import {
  Container,
  Content,
  Card,
  Icon,
  CardItem,
  Text,
  View,
  Button,
  H3,
  Toast
} from "native-base";
import { getColemiasByApiario } from "../../../redux/actions/colmeiaActions";
import { createVisita } from "../../../redux/actions/visitaActions";
import { SpinnerCustom } from "../../../componentes";
import { colors, routes, images } from "../../../../assets";
import ColmeiaItem from "./ColmeiaItem";
import FormVisita from "./FormVisita";
import HeaderVisita from "./HeaderVisita";

class NewVisitaColmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmeia: null,
      colmeiasNaoVisitadas: [],
      colmeiasVisitadas: [],
      done: false,
      doneColmeias: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { done, doneColmeias } = this.state;
    if (doneColmeias && nextProps.colmeias) {
      this.renderItemColmeia(nextProps.colmeias, []);
      this.setState({ doneColmeias: false });
    }
    if (done) {
      console.log("nextProps", nextProps);

      this.setState({ done: false });
      if (nextProps.storeError) {
        return Toast.show({
          text: nextProps.storeMessages && nextProps.storeMessages,
          buttonText: "",
          type: "danger"
        });
      } else {
        Toast.show({
          text: nextProps.storeMessages && nextProps.storeMessages,
          buttonText: "",
          type: "success"
        });

        this.props.navigation.navigate(routes.VisitasHome);
      }
    }
  }

  componentDidMount() {
    this.getColmeiasByApiario();
  }

  renderItemColmeia = (colmeias, colmeiasVisitadas) => {
    let colmeiasAux = [];
    let color = "#FAFAFA";
    if (colmeias && colmeias.length) {
      colmeiasAux.push("Cancelar Seleção");
    } else {
      colmeiasAux.push("Apiarios sem colmeias");
    }
    colmeias.forEach(colmeia => {
      color =
        colmeiasVisitadas &&
        colmeiasVisitadas.findIndex(c => c.colmeia_id === colmeia.id) >= 0
          ? colors.btn_success
          : "#FAFAFA";

      colmeia &&
        colmeiasAux.push(<ColmeiaItem colorIcon={color} colmeia={colmeia} />);
    });
    // console.log("colmeiasVisitadas", colmeiasVisitadas);

    this.setState({ colmeiasNaoVisitadas: colmeiasAux });
  };

  getColmeiasByApiario = () => {
    this.props.getColemiasByApiario({
      id: this.props.navigation.getParam("apiario_id", "")
    });
    this.setState({ colmeia: null, doneColmeias: true });
  };

  onAddVisitaColmeia = values => {
    const { colmeia, colmeiasVisitadas } = this.state;
    let index = -1;
    let visita = {
      ...values,
      colmeia_id: colmeia.id
    };
    index =
      colmeiasVisitadas &&
      colmeiasVisitadas.findIndex(c => c.colmeia_id === colmeia.id);

    if (index >= 0) {
      this.setState(prevState => ({
        colmeiasVisitadas: {
          ...prevState.colmeiasVisitadas,
          [prevState.colmeiasVisitadas[index]]: visita
        },
        colmeia: null
      }));
    } else {
      this.setState({
        colmeiasVisitadas: [...colmeiasVisitadas, visita],
        colmeia: null
      });
    }
    Toast.show({
      text: "Visita adicionada",
      buttonText: "",
      type: "success"
    });
    this.renderItemColmeia(this.props.colmeias, [...colmeiasVisitadas, visita]);
  };

  onConcluirVisita = () => {
    const { colmeiasVisitadas } = this.state;
    this.setState({ done: true });
    data = {
      visitas_colmeias: colmeiasVisitadas,
      visita_apiario: this.props.navigation.getParam("visita_apiario", ""),
      apiario_id: this.props.navigation.getParam("apiario_id", "")
    };
    this.props.createVisita(data);
  };

  onChangeSelectColmeia = index => {
    const { colmeias } = this.props;

    if (index !== 0 && colmeias[index - 1]) {
      this.setState({ colmeia: colmeias[index - 1] });
    }
  };

  showActionSheet = () => {
    const { colmeiasNaoVisitadas } = this.state;

    colmeiasNaoVisitadas &&
      colmeiasNaoVisitadas.length > 0 &&
      this.ActionSheet.show();
  };

  render() {
    const { loading, colmeias } = this.props;
    const { colmeia, colmeiasNaoVisitadas } = this.state;
    return (
      <Container>
        <HeaderVisita handleConcluirVisita={this.onConcluirVisita} />
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
                  source={images.icons.colmeia}
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
                options={colmeiasNaoVisitadas}
                cancelButtonIndex={0}
                // destructiveButtonIndex={1}
                onPress={index => {
                  this.onChangeSelectColmeia(index);
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
              <FormVisita handleAddVisitaColmeia={this.onAddVisitaColmeia} />
            </View>
          ) : !loading && !colmeia ? (
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
                <Image style={{marginTop: '15%'}} source={images.home.colmeia} />
              </View>
            </>
          ) : (
            !loading &&
            !colmeias.length && (
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
                      this.props.navigation.navigate(routes.NewColmeia, {
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
                  <Image source={images.home.colmeia} />
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
    loading: state.colmeiaState.loading || state.visitaState.visitaIsLoading,
    colmeias: state.colmeiaState.colmeias,
    visita: state.visitaState.visita,

    storeMessages: state.visitaState.storeMessages,
    storeError: state.visitaState.storeError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getColemiasByApiario, createVisita }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVisitaColmeia);
