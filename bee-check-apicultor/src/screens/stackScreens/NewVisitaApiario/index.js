import React, { Component } from "react";
import styles from "./styles";
import {
  Container,
  Left,
  Body,
  Right,
  Content,
  Card,
  Picker,
  Text,
  CardItem,
  View,
  Textarea
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import { createVisitaApiario } from "../../../redux/actions/visitaApiarioActions";
import { Image } from "react-native";
import {
  InputSwitch,
  HeaderCustom,
  ButtonCustom,
  SpinnerCustom
} from "../../../componentes";

class NewVisitaApiario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPickerApiario: null,
      tem_agua: 1,
      tem_sombra: 1,
      tem_comida: 1,
      observacao: ""
    };
  }

  handleRefresh = () => {
    this.props.fetchApiariosByUser();
    this.setState({ selectedPickerApiario: null });
  };

  onSaveVisita = () => {
    let tem_agua = this.state.tem_agua == 1 ? 0 : 1;
    let tem_sombra = this.state.tem_sombra == 1 ? 0 : 1;
    let tem_comida = this.state.tem_comida == 1 ? 0 : 1;
    // this.props.createVisitaApiario({
    //   tem_agua,
    //   tem_sombra,
    //   tem_comida,
    //   observacao: this.state.observacao,
    //   apiario_id: this.state.selectedPickerApiario.id
    // });
    // alert("clicou");
    this.props.navigation.navigate("NewVisitaColmeia", {
      apiario_id: this.state.selectedPickerApiario.id
    });
  };

  onValueChangePickerApiario = apiario => {
    this.setState({
      selectedPickerApiario: apiario,
      tem_agua: 1,
      tem_sombra: 1,
      tem_comida: 1,
      observacao: ""
    });
  };

  render() {
    const { apiarios, loading } = this.props;
    const {
      selectedPickerApiario,
      tem_agua,
      tem_sombra,
      tem_comida,
      observacao
    } = this.state;

    return (
      <Container>
        <HeaderCustom
          title="Visita"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <Content padder>
          <SpinnerCustom visible={loading} />
          <Card>
            <CardItem>
              <Image
                source={require("../../../../images/apiario.png")}
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
          <CardItem>
            <Text style={styles.textSubTitle}>
              Responda as questões abaixo sobre o apiario{" "}
              {selectedPickerApiario && selectedPickerApiario.nome}
            </Text>
          </CardItem>
          {selectedPickerApiario ? (
            <View>
              <CardItem>
                <Left>
                  <Text>Há Água?</Text>
                </Left>
                <Body />
                <Right>
                  <InputSwitch
                    value={tem_agua}
                    onValueChange={tem_agua => this.setState({ tem_agua })} // this is necessary for this component
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Está sombreado?</Text>
                </Left>
                <Body />
                <Right>
                  <InputSwitch
                    value={tem_sombra}
                    onValueChange={tem_sombra => this.setState({ tem_sombra })} // this is necessary for this component
                  />
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text>Há Comida?</Text>
                </Left>
                <Body />
                <Right>
                  <InputSwitch
                    value={tem_comida}
                    onValueChange={tem_comida => this.setState({ tem_comida })} // this is necessary for this component
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
                  title="Visitar Colmeias"
                  iconRight="arrowright"
                  typeIconRight="AntDesign"
                />
              </CardItem>
            </View>
          ) : (
            <CardItem>
              <Text style={{ marginStart: 10 }}>
                Primeiro selecione um apiario
              </Text>
            </CardItem>
          )}
        </Content>
      </Container>
    );
  }
}

// export default Visita;
function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    loading: state.apiarioState.loading || state.visitaApiarioState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchApiariosByUser, createVisitaApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVisitaApiario);
