import React, { Component } from "react";
import { StatusBar, ScrollView } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";

import { Container, View, Text } from "native-base";
import { colors, routes } from "../../../../assets";
import { HeaderCustom, Apiary } from "../../../componentes";
import styles from './styles';

class Visita extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchApiariosByUser();
  }

  handleRefresh = () => {
    this.props.fetchApiariosByUser(true);
  };

  openVisitList = selectedApiary => {
    this.props.navigation.navigate(routes.VisitList, {selectedApiary});
  };

  render() {
    const { apiarios } = this.props;

    return (
      <Container>

      <StatusBar backgroundColor={colors.theme_default} />

        <HeaderCustom
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Histórico de Visitas"
          description="Aqui, você pode visualizar os dados de todas as visitas realizadas"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />

        <View style = {styles.containerContentVisits}>
          <Text style = {styles.title}>Selecione um apiário</Text>
          <Text style = {styles.description}>Selecione um apiário para ver o histórico de visitas correspondente a ele</Text>
          <View style = {styles.contentVisits}>
            <View style = {[styles.triangle,styles.arrowUp]}/>
              <ScrollView contentContainerStyle={{ width: '100%'}} showsVerticalScrollIndicator = {false}>
                {
                  apiarios.map(apiary =>
                    <Apiary 
                      key = {apiary.id} 
                      apiaryId = {apiary.id} 
                      name = {apiary.nome} 
                      description = {apiary.descricao} 
                      openList = {() => this.openVisitList(apiary)}
                    />
                  )
                }
                <View style = {{height: 100}}/>
              </ScrollView>
            </View>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
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
)(Visita);