import React, { Component } from "react";
import { Image, ScrollView, StatusBar } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import { getColmeiasByApiario } from "../../../redux/actions/colmeiaActions";

import { Container, Text, View } from "native-base";
import { colors, routes } from "../../../../assets";
import { HeaderCustom, SpinnerCustom } from "../../../componentes";
import Apiary from "../../../componentes/Apiary";
import styles from "./styles";

class Colmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmeia: {},
      selectedPickerApiario: null,
    };
  }

  componentDidMount() {
    this.fetchApiarios();
  }
  
  // regarregar a página
  handleRefresh() {
    this.fetchApiarios();
    this.setState({ selectedPickerApiario: null });
  }
  
  // pegar todos os apiários do usuário
  fetchApiarios() {
    this.props.fetchApiariosByUser();
  }

  // abrir tela que mostra a lista de colmeias de determinado apiário
  openHiveList = selectedApiary => {
    this.props.navigation.navigate(routes.HiveList, {selectedApiary});
  };

  render() {
    const { apiarios, loading } = this.props;

    return (
      <Container>

        <StatusBar backgroundColor={colors.theme_default} />

        <HeaderCustom
          iconLeft="menu"
          typeIconLeft="SimpleLineIcons"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Colmeias"
          description="Aqui, você pode visualizar e gerenciar todas as colmeias cadastradas"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />

        <SpinnerCustom visible={loading} />

        <View style = {styles.containerContentApiarys}>
          <Text style = {styles.title}>Selecione um apiário</Text>
          <Text style = {styles.description}>Selecione um apiário para ver suas colmeias</Text>
          <View style = {styles.contentApiary}>
            <View style = {[styles.triangle,styles.arrowUp]}/>
              <ScrollView contentContainerStyle={{ width: '90%'}}>
                { !apiarios || apiarios == '' ?
                  (
                    <View style = {styles.container}>
                      <Image
                        style = {styles.image}
                        source={require ('../../../../images/empty.png')}
                      />
                      <Text style = {styles.textNull}>{`Nenhum apiário encontrado :(`}</Text>
                    </View>
                  ) : (
                    apiarios.map (apiary =>
                      <Apiary 
                        key = {apiary.id} 
                        apiaryId = {apiary.id} 
                        name = {apiary.nome} 
                        description = {apiary.descricao} 
                        openList = {() => this.openHiveList(apiary)}/>
                    )
                  )
                }
                <View style = {{height: 30}}/>
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
    loading: state.apiarioState.loading || state.colmeiaState.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchApiariosByUser, getColmeiasByApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Colmeia);