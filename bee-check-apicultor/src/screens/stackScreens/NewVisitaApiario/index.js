import React, { Component } from "react";
import styles from "./styles";
import { Container, Text, View } from "native-base";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import { SpinnerCustom } from "../../../componentes";
import FormVisita from "./FormVisita";
import { routes } from "../../../../assets";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";

class NewVisitaApiario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPickerApiario: this.props.navigation.getParam("apiary", ""),
    };
  }

  // recarregar as informações da tela
  handleRefresh = () => {
    this.props.fetchApiariosByUser();
  };

  onAddVisitaApiario = values => {
    this.props.navigation.navigate(routes.NewVisitaColmeia, {
      apiario_id: this.state.selectedPickerApiario.id,
      visita_apiario: values
    });
  };

  render() {
    const { loading } = this.props;
    const { selectedPickerApiario } = this.state;    
    const apiarios = this.props.apiarios.filter(apiario => apiario.colmeias.length > 0)

    return (
      <Container>
        <HeaderCustomStack
          title="Nova Visita"
          description = "Insira as informações solicitadas e cadastre numa nova visita no apiário"
        />
        <SpinnerCustom visible={loading} />
        <View style = {styles.containerContentForm}>
          <Text style = {styles.textSubTitle}>{`Responda às questões abaixo\n sobre o apiário `} {selectedPickerApiario.nome}</Text>
          <ScrollView contentContainerStyle={{ width: '100%', paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center'}}>
            <FormVisita handleAddVisitaApiario={this.onAddVisitaApiario} />
          </ScrollView>
        </View>
        <SpinnerCustom visible={loading} />   
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    loading: state.apiarioState.loading || state.visitaState.visitaIsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchApiariosByUser },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVisitaApiario);

{/* <Card>
            <CardItem>
              <Image
                source={images.icons.apiario}
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
                  label={"Selecione um apiário"}
                  value={null}
                />
                {!apiarios ? (
                  <Picker.Item
                    enabled={false}
                    note
                    label={"Nenhum apiário encontrado"}
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
          </Card> */}
