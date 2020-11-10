import React, { Component } from "react";
import { ScrollView } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";

import { Container, Text, View } from "native-base";
import { SpinnerCustom } from "../../../componentes";
import { routes } from "../../../../assets";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import FormVisita from "./FormVisita";
import styles from "./styles";

class NewVisitaApiario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPickerApiario: this.props.navigation.getParam("apiary", ""),
    };
  }

  onAddVisitaApiario = values => {
    this.props.navigation.navigate(routes.NewVisitaColmeia, {
      apiario_id: this.state.selectedPickerApiario.id,
      visita_apiario: values
    });
  };

  render() {
    const { loading } = this.props;
    const { selectedPickerApiario } = this.state;

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