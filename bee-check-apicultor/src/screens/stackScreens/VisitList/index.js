import React, { Component } from "react";
import { ScrollView, StatusBar, TouchableHighlight } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getVisitasByApiario } from "../../../redux/actions/visitaActions";

import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import LinearGradient from "react-native-linear-gradient";
import { SpinnerCustom } from "../../../componentes";
import { colors, routes } from "../../../../assets";
import {
  Icon,
  Container,
  Text,
  View,
} from "native-base";
import Visit from "../../../componentes/Visit";
import styles from "./styles";

class VisitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visita: {},
      selectedApiary: this.props.navigation.getParam('selectedApiary'),
    };
  }

  componentDidMount() {
    this.fecthVisita(this.state.selectedApiary.id);
  };

  handleRefresh = () => {
    this.fecthVisita(this.state.selectedApiary.id);
  };

  fecthVisita(id) {
    this.props.getVisitasByApiario({ id });
  };

  // handleDelete = () => {
  //   this.setState({ dialogVisible: false });
  //   this.props.deleteVisita({
  //     visita_id: this.state.visita.id,
  //     apiario_id: this.state.selectedPickerApiario.id
  //   });
  // };

  openNewVisit = () => {
    this.props.navigation.navigate(routes.NewVisitaApiario, {
      apiary: this.state.selectedApiary
    });
  };

  openVisitDetails = visit => {
    this.props.navigation.navigate(routes.DetalhesVisita, {
      visit, apiary: this.state.selectedApiary
    });
  };

  render() {
    const { selectedApiary } = this.state;
    const { loading } = this.props;
    const visitas = selectedApiary !== null
      ? this.props.visitas[selectedApiary.id] || []
      : [];

    return (
      <Container>
        <StatusBar backgroundColor={colors.theme_default} />
          <HeaderCustomStack
            title="Histórico de Visitas"
            description="Você pode visualizar os dados de todas as visitas realizadas no apiário selecionado"
            iconRight="sync"
            handleIconRight={() => this.handleRefresh()}
            typeIconRight="AntDesign"
          />
          <SpinnerCustom visible={loading} />
        <View style = {styles.containerContentVisits}>
          <Text style = {styles.title}>Aqui estão todas as visitas realizadas no apiário {this.state.selectedApiary.nome}</Text>
        </View>
          <ScrollView contentContainerStyle={{ width: '100%', padding: 5, }}>
          {
              visitas.map (visit =>
                <Visit 
                  key = {visit.id} 
                  visitId = {visit.id} 
                  date = {visit.created_at} 
                  hives = {visit.visita_colmeias}
                  hivesLength = {visit.visita_colmeias.length}  
                  visit = {visit}
                  openVisitList = {this.openVisitDetails}
                />
              )
          }
          <View style = {{height: 120}}/>
          </ScrollView>
        <View style = {styles.addVisitButton}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="#ff8500"
            onPress={this.openNewVisit}
            style = {{borderRadius: 30}}
          >
            <LinearGradient
              colors={[colors.theme_default, colors.theme_second]}
              style={{ height: '100%', borderRadius: 30}}
            >
              <Icon type="FontAwesome5" name="plus" style={styles.plus} iconSize={5} active/>
            </LinearGradient>
          </TouchableHighlight>
        </View>
        
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    visitas: state.visitaState.visitas,
    loading: state.apiarioState.loading || state.visitaState.visitaIsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getVisitasByApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitList);

//  { // Mostrar se a visita está sincronizada ou não
//    visita.isSynced
//      ? (<Text style={{ fontWeight: 'bold', color: '#9F0' }}>SINCRONIZADO</Text>) // visita.isSynced -> TRUE; visita.permanentlyFailed -> FALSE
//      : visita.permanentlyFailed
//        ? (<Text style={{ fontWeight: 'bold', color: '#F00' }}>FALHOU PERMANENTEMENTE</Text>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> TRUE 
//        : (<Text style={{ fontWeight: 'bold', color: '#F60' }}>AINDA NÃO SINCRONIZADO</Text>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> FALSE
//  }