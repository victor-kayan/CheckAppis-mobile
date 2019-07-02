import React, { Component } from "react";
import { Image } from "react-native";
import {
  Card,
  CardItem,
  Container,
  Content,
  Picker,
  Text,
  Left,
  Thumbnail,
  Body,
  Icon,
  Button,
  Right
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import { fecthIntervencoesByApiario, concluirIntervencao } from "../../../redux/actions/intervencaoActions";
import {
  HeaderCustom,
  HeaderCard,
  SpinnerCustom,
  ButtonCustom
} from "../../../componentes";
import moment from "moment";
import "moment/locale/pt-br";
import styles from "./styles";
import { colors } from "../../../../assets";

class Intervencao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPickerApiario: []
    };
  }

  componentDidMount() {
    this.fetchApiarios();
  }

  handleRefresh() {
    this.fetchApiarios();
    this.setState({ selectedPickerApiario: null });
  }

  fetchApiarios() {
    this.props.fetchApiariosByUser();
  }

  onValueChangePickerApiario = apiario => {
    this.setState({ selectedPickerApiario: apiario });
    if (apiario) {
      this.props.fecthIntervencoesByApiario({ apiario_id: apiario.id });
    }
  };

  handleConcluir = (intervencao) => {
    this.props.concluirIntervencao({intervencao_id : intervencao.id});
    this.props.fecthIntervencoesByApiario({apiario_id: intervencao.apiario_id});
  }

  render() {
    const { selectedPickerApiario } = this.state;
    const { apiarios, loading } = this.props;
    const { intervencoes } = selectedPickerApiario ? this.props : [];

    return (
      <Container>
        <HeaderCustom
          iconLeft="menu"
          typeIconLeft="MaterialCommunityIcons"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Intervenções"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <SpinnerCustom visible={loading} />
        <Content padder scrollEnabled={true}>
          <Card>
            <HeaderCard style={styles.header} icon="list" title="Listagem" />
            <CardItem>
              <Image
                source={require("../../../../images/icons/apiario128.png")}
                style={styles.iconImagemSelectPicker}
              />
              <Picker
                mode="dropdown"
                selectedValue={selectedPickerApiario}
                style={styles.pikerLisitApiario}
                onValueChange={itemValue =>
                  this.onValueChangePickerApiario(itemValue)
                }
              >
                <Picker.Item
                  enabled={false}
                  key={null}
                  label={"Selecione um Apiario"}
                  value={null}
                />
                {!apiarios ? (
                  <Picker.Item
                    enabled={false}
                    note
                    label={"Nenhum Apiario encontrado"}
                  />
                ) : (
                  apiarios.map(data => {
                    return (
                      <Picker.Item
                        key={data.id}
                        label={data.nome}
                        value={data}
                      />
                    );
                  })
                )}
              </Picker>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem header>
              <Text>Listagem de Intervenções</Text>
            </CardItem>
            {intervencoes && intervencoes.length > 0 ? (
              intervencoes.map(intervencao => {
                return (
                  <Card key={intervencao.id} style={{ flex: 0 }}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{ uri: intervencao.tecnico.foto }} />
                        <Body>
                          <Text>{intervencao.tecnico.name}</Text>
                          <Text note>
                            {moment(intervencao.created_at).fromNow()}
                          </Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>{intervencao.descricao}</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent textStyle={{ color: "#2EC72E" }}>
                          <Icon name="clock" style={{ color: "#2EC72E" }} />
                          <Text style={{ color: "#2EC72E", fontSize: 10 }}>
                            Inicio:{" "}
                            {moment(intervencao.data_inicio).format(
                              "DD MMMM  YYYY"
                            )}
                          </Text>
                        </Button>
                      </Left>
                      <Right>
                        <Button transparent textStyle={{ color: "#FB0505" }}>
                          <Icon name="clock" style={{ color: "#FB0505" }} />
                          <Text style={{ color: "#FB0505", fontSize: 10 }}>
                            Fim:{" "}
                            {moment(intervencao.data_fim).format(
                              "DD MMMM  YYYY"
                            )}
                          </Text>
                        </Button>
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <ButtonCustom
                          small
                          style={styles.button}
                          title="Concluir"
                          onPress={() => this.handleConcluir(intervencao)}
                        />
                      </Left>
                      <Right>
                        <ButtonCustom
                          small
                          iconRight
                          style={styles.button}
                          title="Colmeias"
                          iconRight="magnifying-glass"
                          typeIconRight="Entypo"
                          onPress={() =>
                            this.props.navigation.navigate(
                              "IntervencaoColmeia",
                              {
                                intervencao_id: intervencao.id
                              }
                            )
                          }
                        />
                      </Right>
                    </CardItem>
                  </Card>
                );
              })
            ) : !selectedPickerApiario && !selectedPickerApiario > 0 ? (
              <CardItem>
                <Text style={{ marginStart: 10 }}>
                  Primeiro selecione um apiario
                </Text>
              </CardItem>
            ) : (
              <CardItem>
                <Text>Nenhuma Intervenção cadastrada para este Apiario</Text>
              </CardItem>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    loading: state.apiarioState.loading || state.intervencaoState.loading,
    intervencoes: state.intervencaoState.intervencoes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchApiariosByUser, fecthIntervencoesByApiario, concluirIntervencao },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intervencao);
