import React, { Component } from "react";
import { Image, ScrollView } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fecthIntervencoesByApicultor } from "../../../redux/actions/intervencaoActions";

import { Container, Content, Text, View, Icon} from "native-base";
import { SpinnerCustom, ButtonCustom } from "../../../componentes";
import { images, routes } from "../../../../assets";
import { ItemLista } from "./ItemLista";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import Intervention from "../../../componentes/Intervention";
import styles from "./styles";

class IntervencaoApiario extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.fetchIntervencoes();
  }

  handleRefresh() {
    this.fetchIntervencoes();
  }

  fetchIntervencoes() {
    this.props.fecthIntervencoesByApicultor();
  }

  onDetalharIntervencao = intervention => {
    this.props.navigation.navigate(routes.DetalhesIntervencao, {
      intervencao: intervention,
    });
  };

  render() {
    const { loading, intervencoes } = this.props;

    return (
      <Container>
        <HeaderCustomStack
          title={`Intervenções nos \nApiários`}
          description = "Veja todas as intervenções propostas para seus apiários"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <SpinnerCustom visible={loading} />
        {!intervencoes || intervencoes == '' ? 
          (
            <View style = {styles.container}>
              <Image
                  style = {styles.image}
                  source={require ('../../../../images/empty.png')}
                />
              <Text style = {styles.textNull}>{'Nenhuma intervenção para ser concluída no momento :)'}</Text>
            </View>
          ) : (
            <View style = {styles.container}>
              <Text style = {styles.text}>Aqui estão todas as intervenções dos seus apiários</Text>
              <ScrollView contentContainerStyle={{ width: '90%', paddingHorizontal: 20 }}>
                {
                  intervencoes && intervencoes.map ((intervention, index) =>
                    <Intervention 
                      key = {index} 
                      interId = {intervention.id} 
                      intervention = {intervention}
                      apiaryName = {intervention.apiario.nome}
                      openInterventionApiary = {this.onDetalharIntervencao}
                      creationDate = {intervention.created_at}
                      isConcluded = {intervention.is_concluido}
                      isConclusionSynced = {intervention.isConclusionSynced}
                    />
                  )
                }
                <View style = {{height: 100}}/>
              </ScrollView>
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
    loading: state.apiarioState.loading || state.intervencaoState.loading,
    intervencoes: state.intervencaoState.intervencoes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fecthIntervencoesByApicultor },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervencaoApiario);