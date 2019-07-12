import React, { Component } from "react";
import styles from "./styles";
import {
  Container,
  Content,
  Card,
  Picker,
  Text,
  CardItem,
  View
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import { createVisita } from "../../../redux/actions/visitaActions";
import { Image } from "react-native";
import { HeaderCustom, SpinnerCustom } from "../../../componentes";
import FormVisita from "./FormVisita";
import { routes } from "../../../../assets";

const imageApiario128 = require("../../../../images/icons/apiario128.png");

class NewVisitaApiario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPickerApiario: null
    };
  }

  handleRefresh = () => {
    this.props.fetchApiariosByUser();
    this.setState({ selectedPickerApiario: null });
  };

  onAddVisitaApiario = values => {
    this.props.navigation.navigate(routes.NewVisitaColmeia, {
      apiario_id: this.state.selectedPickerApiario.id,
      visita_apiario: values
    });
  };

  onValueChangePickerApiario = apiario => {
    this.setState({
      selectedPickerApiario: apiario
    });
  };

  render() {
    const { apiarios, loading } = this.props;
    const { selectedPickerApiario } = this.state;

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
          {!loading && selectedPickerApiario ? (
            <View>
              <CardItem>
                <Text style={styles.textSubTitle}>
                  {selectedPickerApiario &&
                    `Responda as questões abaixo sobre o apiario ${
                      selectedPickerApiario.nome
                    }`}
                </Text>
              </CardItem>
              <FormVisita handleAddVisitaApiario={this.onAddVisitaApiario} />
            </View>
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
                  <Text>Primeiro selecione um apiario</Text>
                </CardItem>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image source={imageApiario128} />
                </View>
              </>
            )
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
    loading: state.apiarioState.loading || state.visitaState.visitaIsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchApiariosByUser, createVisita },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVisitaApiario);
