import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import { Text, Container, View } from "native-base";
import { Image, ScrollView } from "react-native";
import { routes } from "../../../../assets";
import { SpinnerCustom } from "../../../componentes";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";
import Apiary from "../../../componentes/Apiary";

class IntervencaoColmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh = () => {
    this.props.fetchApiariosByUser();
  };

  handleReturnHome = () => {
    this.props.navigation.navigate(routes.Home);
  };

  onDetalharIntervencao = intervencao => {
    this.props.navigation.navigate(routes.DetalhesIntervencao, {
      intervencao: intervencao,
    });
  };

  openInterventionHiveList = (apiaryId, name) => {
    this.props.navigation.navigate(routes.InterventionHiveList, {apiaryId, name})
  };

  render() {
    const { apiarios, loading } = this.props;

    return (
      <Container>
        <HeaderCustomStack
          title={`Intervenções nas \nColmeias`}
          description = "Veja todas as intervenções propostas para suas colmeias"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <SpinnerCustom visible={loading} />
          { !apiarios || apiarios == '' ?
            (
              <View style = {styles.container}>
                <Image
                  style = {styles.image}
                  source={require ('../../../../images/empty.png')}
                />
                <Text style = {styles.textNull}>{`Nã há intervenções nas colmeias dos seus apiários :)`}</Text>
              </View>
            ) : (
              <View style = {styles.container}>
                <Text style = {styles.title}>Selecione o apiário do qual deseja ver as intervenções das colmeias</Text>
                <View style = {styles.containerContent}>
                  <View style = {[styles.triangle,styles.arrowUp]}/>
                  <ScrollView contentContainerStyle={{ width: '100%'}}>
                    {
                      apiarios.map (apiary =>
                      <Apiary 
                        key = {apiary.id} 
                        apiaryId = {apiary.id} 
                        name = {apiary.nome} 
                        description = {apiary.descricao} 
                        openList = {this.openInterventionHiveList}/>
                      )
                    }
                    <View style = {{height: 100}}/>
                  </ScrollView>
                </View>
              </View>
            )
            }
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    loading: state.apiarioState.loading || state.intervencaoState.loading
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
)(IntervencaoColmeia);