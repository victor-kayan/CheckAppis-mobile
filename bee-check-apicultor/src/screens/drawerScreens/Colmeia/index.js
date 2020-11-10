import React, { Component } from "react";
import { Image, ScrollView, StatusBar, RefreshControl } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";

import { Container, Text, View } from "native-base";
import { colors, routes } from "../../../../assets";
import { HeaderCustom } from "../../../componentes";
import Apiary from "../../../componentes/Apiary";
import styles from "./styles";

class Colmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    this.props.fetchApiariosByUser(); // pegar todos os apiários do usuário
  }
  
  // regarregar a página
  handleRefresh() {
    this.props.fetchApiariosByUser(true); // pegar todos os apiários do usuário
  }

  // abrir tela que mostra a lista de colmeias de determinado apiário
  openHiveList = selectedApiary => {
    this.props.navigation.navigate(routes.HiveList, {selectedApiary});
  };

  render() {
    const { apiarios } = this.props;

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

        <View style = {styles.containerContentApiarys}>
          <Text style = {styles.title}>Selecione um apiário</Text>
          <Text style = {styles.description}>Selecione um apiário para ver suas colmeias</Text>
          <View style = {styles.contentApiary}>
            <View style = {[styles.triangle,styles.arrowUp]}/>
              <ScrollView
                contentContainerStyle={{ width: '100%'}}
                showsVerticalScrollIndicator = {false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.handleRefresh()}
                    colors={[colors.theme_primary]}
                  />
                }
              >
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
)(Colmeia);