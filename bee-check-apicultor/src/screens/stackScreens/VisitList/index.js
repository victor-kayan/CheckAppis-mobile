import React, { Component } from "react";
import { ScrollView, StatusBar, TouchableHighlight, Image } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getVisitasByApiario } from "../../../redux/actions/visitaActions";

import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import LinearGradient from "react-native-linear-gradient";
import { SpinnerCustom } from "../../../componentes";
import { colors, routes } from "../../../../assets";
import { Icon, Container, Text, View } from "native-base";
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
    // carregar visitas pelo apiário selecionado
    this.props.getVisitasByApiario(this.state.selectedApiary.id);
  };

  // recarregar informações da tela
  handleRefresh = () => {
    this.props.getVisitasByApiario(this.state.selectedApiary.id, true);
  };

  // abrir tela para criar nova visita
  openNewVisit = () => {
    this.props.navigation.navigate(routes.NewVisitaApiario, {
      apiary: this.state.selectedApiary
    });
  };

  // abrir tela de detalhes da visita
  openVisitDetails = visit => {
    this.props.navigation.navigate(routes.DetalhesVisita, {
      visit, apiary: this.state.selectedApiary
    });
  };

  render() {
    const { selectedApiary } = this.state;
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

          <View style = {styles.containerContentVisits}>
            <Text style = {styles.title}>Aqui estão todas as visitas realizadas no apiário {this.state.selectedApiary.nome}</Text>
            <View style = {styles.contentVisit}>
              <ScrollView contentContainerStyle={{ width: '100%', padding: 10, }} showsVerticalScrollIndicator = {false}>
                { !visitas || visitas == '' ? 
                  (
                    <>
                      <Image
                        style = {styles.image}
                        source={require ('../../../../images/empty.png')}
                      />
                      <Text style = {styles.textNull}>{`Nenhuma visita foi encontrada. Recarregue a página ou realize uma visita :)`}</Text>
                    </>
                  ) 
                  : (
                    visitas.map (visit =>
                      <Visit 
                        key = {visit.id} 
                        visitId = {visit.id} 
                        date = {visit.created_at} 
                        hives = {visit.visita_colmeias}
                        hivesLength = {visit.visita_colmeias.length}  
                        visit = {visit}
                        sync = {visit.isSynced}
                        fail = {visit.permanentlyFailed}
                        openVisitList = {this.openVisitDetails}
                      />
                    )
                  )
                }
                <View style = {{height: 170}}/>
              </ScrollView>
            </View>
          </View>
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