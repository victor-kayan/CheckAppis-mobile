import React, { Component } from "react";
import { Image, NetInfo, StatusBar } from "react-native";
import 'react-native-get-random-values';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { v4 as uuidv4 } from 'uuid';
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

import { getColmeiasByApiario } from "../../../redux/actions/colmeiaActions";
import { createVisita } from "../../../redux/actions/visitaActions";
import { SpinnerCustom } from "../../../componentes";
import { colors, routes, images } from "../../../../assets";
import ColmeiaItem from "./ColmeiaItem";
import FormVisita from "./FormVisita";
import HeaderVisita from "./HeaderVisita";
import styles from "./styles";

import tron from '../../../config/ReactotronConfig'

class NewVisitaColmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmeia: null,
      colmeiasNaoVisitadas: [],
      colmeiasVisitadas: [],
      colmeiasDoApiarioAtual: [],
      done: false,
      doneColmeias: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const apiarioId = this.props.navigation.getParam("apiario_id", "");
    const { doneColmeias } = this.state;

    if (doneColmeias && nextProps.colmeias) {
      this.renderItemColmeia(nextProps.colmeias[apiarioId], []);
      this.setState({ doneColmeias: false });
    }
  }

  componentDidMount() {
    this.getColmeiasByApiario();
  }

  getColmeiasByApiario = () => {
    const apiarioId = this.props.navigation.getParam("apiario_id", "");
    
    tron.log(apiarioId)

    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.props.getColmeiasByApiario(apiarioId);
        this.setState({ doneColmeias: true })
      } else {
        this.renderItemColmeia(this.props.colmeias[apiarioId], []);
      }
    });
    
    this.setState({ colmeiasDoApiarioAtual: this.props.colmeias[apiarioId] });
  };

  renderItemColmeia = (colmeias, colmeiasVisitadas) => {
    let colmeiasAux = [];
    let color = "#FAFAFA";

    if (
      colmeias &&
      colmeias.length &&
      colmeiasVisitadas.length !== colmeias.length
    ) {
      colmeiasAux.push("Cancelar Seleção");
    } else if (colmeiasVisitadas.length === colmeias.length) {
      colmeiasAux.push(
        <Button
          style={{ backgroundColor: colors.btn_success }}
          iconRight
          full
          onPress={this.onConcluirVisita}
        >
          <Text>Concluir visita</Text>
          <Icon type="FontAwesome" name="save" />
        </Button>
      );
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

    this.setState({ colmeiasNaoVisitadas: colmeiasAux });
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
      colmeiasVisitadas.length &&
      colmeiasVisitadas.findIndex(c => c.colmeia_id === colmeia.id);

    if (index >= 0) {
      this.setState({
        colmeiasVisitadas: [
          ...this.state.colmeiasVisitadas.slice(0, index),
          Object.assign({}, this.state.colmeiasVisitadas[index], visita),
          ...this.state.colmeiasVisitadas.slice(index + 1)
        ],
        colmeia: null
      });
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

    this.renderItemColmeia(this.state.colmeiasDoApiarioAtual, [...colmeiasVisitadas, visita]);
  };

  onFinishVisitaColmeia = values => {
    const { colmeia, colmeiasVisitadas } = this.state;
    let index = -1;
    let visita = {
      ...values,
      colmeia_id: colmeia.id
    };

    index =
      colmeiasVisitadas &&
      colmeiasVisitadas.length &&
      colmeiasVisitadas.findIndex(c => c.colmeia_id === colmeia.id);

    if (index >= 0) {
      this.setState({
        colmeiasVisitadas: [
          ...this.state.colmeiasVisitadas.slice(0, index),
          Object.assign({}, this.state.colmeiasVisitadas[index], visita),
          ...this.state.colmeiasVisitadas.slice(index + 1)
        ],
        colmeia: null
      });
    } else {
      this.setState({
        colmeiasVisitadas: [...colmeiasVisitadas, visita],
        colmeia: null
      });
    }
    
    this.renderItemColmeia(this.state.colmeiasDoApiarioAtual, [...colmeiasVisitadas, visita]);
    this.onConcluirVisita();
  };

  onConcluirVisita = () => {
    const { colmeiasVisitadas } = this.state;

    this.setState({ done: true});

    data = {
      visitas_colmeias: colmeiasVisitadas,
      visita_apiario: this.props.navigation.getParam("visita_apiario", ""),
      apiario_id: this.props.navigation.getParam("apiario_id", "")
    };

    const serializedData = this.serializeVisitData(data);
    
    this.props.createVisita(serializedData);
    this.props.navigation.navigate(routes.VisitasHome);
    // TODO: Navegar para a tela de listagem de visitas do apiário que acabou de ser visitado
    
    Toast.show({
      text: "Visita adicionada!",
      buttonText: "",
      type: "success"
    });
  };

  /**
  * Função para calcular e adicionar novas propriedades (metadados) ao objeto da visita
  * 
  * Os dados contendo as quantidades totais dos itens visitados eram calculados e retornados pela API.
  * Essa responsabilidade está sendo passada para o frontend devido a implementação da UI otimista.
  */
  serializeVisitData = data => {
    const numberOfVisitedHives = data.visitas_colmeias.length;

    let qtd_quadros_mel = 0, qtd_quadros_polen = 0, qtd_cria_aberta = 0, qtd_cria_fechada = 0, qtd_quadros_vazios = 0;
    let qtd_colmeias_com_postura = 0, qtd_colmeias_com_abelhas_mortas = 0, qtd_colmeias_com_zangao = 0, qtd_colmeias_com_realeira = 0;
    
    for (hiveVisit of data.visitas_colmeias) {
      qtd_quadros_mel += hiveVisit.qtd_quadros_mel;
      qtd_quadros_polen += hiveVisit.qtd_quadros_polen;
      qtd_cria_aberta += hiveVisit.qtd_cria_aberta;
      qtd_cria_fechada += hiveVisit.qtd_cria_fechada;
      qtd_quadros_vazios += hiveVisit.qtd_quadros_vazios;
      
      if (hiveVisit.tem_postura) {
        qtd_colmeias_com_postura++;
      }
      if (hiveVisit.tem_abelhas_mortas) {
        qtd_colmeias_com_abelhas_mortas++;
      }
      if (hiveVisit.tem_zangao) {
        qtd_colmeias_com_zangao++;
      }
      if (hiveVisit.tem_realeira) {
        qtd_colmeias_com_realeira++;
      }
    }

    const qtd_quadros_analizados = qtd_quadros_mel + qtd_quadros_polen + qtd_cria_aberta + qtd_cria_fechada + qtd_quadros_vazios;
    
    const qtd_colmeias_sem_postura = numberOfVisitedHives - qtd_colmeias_com_postura;
    const qtd_colmeias_sem_abelhas_mortas = numberOfVisitedHives - qtd_colmeias_com_abelhas_mortas;
    const qtd_colmeias_sem_zangao = numberOfVisitedHives - qtd_colmeias_com_zangao;
    const qtd_colmeias_sem_realeira = numberOfVisitedHives - qtd_colmeias_com_realeira;

    const metadata = {
      qtd_quadros_mel, qtd_quadros_polen, qtd_cria_aberta, qtd_cria_fechada, qtd_quadros_vazios,
      qtd_colmeias_com_postura, qtd_colmeias_com_abelhas_mortas, qtd_colmeias_com_zangao, qtd_colmeias_com_realeira,
      qtd_colmeias_sem_postura, qtd_colmeias_sem_abelhas_mortas, qtd_colmeias_sem_zangao, qtd_colmeias_sem_realeira,
      qtd_quadros_analizados
    };

    const visitData = {
      uuid: uuidv4(),   // Identificador universal único para diferenciar cada visita mesmo antes de ser sincronizada.
      isSynced: false,  // Propriedade que define se a visita está sincronizada ou não. Por padrão é definida como "false" pois inicialmente será salvo localmente.
      apiario_id: data.apiario_id,
      visita_colmeias: data.visitas_colmeias,
      ...data.visita_apiario,
      ...metadata,
    };

    return visitData;
  };

  onChangeSelectColmeia = index => {
    const { colmeiasDoApiarioAtual } = this.state;

    if (index !== 0 && colmeiasDoApiarioAtual[index - 1]) {
      this.setState({ colmeia: colmeiasDoApiarioAtual[index - 1] });
    }
  };

  showActionSheet = () => {
    const { colmeiasNaoVisitadas } = this.state;

    colmeiasNaoVisitadas &&
      colmeiasNaoVisitadas.length > 0 &&
      this.ActionSheet.show();
  };

  render() {
    const { loading } = this.props;
    const { colmeia, colmeiasNaoVisitadas, colmeiasDoApiarioAtual } = this.state;

    return (
      <Container>

        <StatusBar backgroundColor={colors.theme_second} />

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
                  Responda às questões abaixo sobre a colmeia{" "}
                  {this.state.colmeia && this.state.colmeia.nome}
                </Text>
              </CardItem>
              <FormVisita handleAddVisitaColmeia={this.onAddVisitaColmeia} handleFinishVisitaColmeia={this.onFinishVisitaColmeia} />
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
                <Image
                  style={{ marginTop: "15%" }}
                  source={images.home.colmeia}
                />
              </View>
            </>
          ) : (
            !loading &&
            !colmeiasDoApiarioAtual.length && (
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
  return bindActionCreators({ 
    getColmeiasByApiario, 
    createVisita, 
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVisitaColmeia);
