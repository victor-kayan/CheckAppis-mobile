import React, { Component } from "react";
import { Image, ScrollView } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchIntervencoesColmeiasByApiario } from "../../../redux/actions/intervencaoActions";

import { Text, Container, View } from "native-base";
import { routes } from "../../../../assets";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import InterventionHive from "../../../componentes/InterventionHive";
import styles from "./styles";

class InterventionHiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiaryId: this.props.navigation.getParam("apiaryId"),
      apiaryName: this.props.navigation.getParam("name"),
    };
  }

  componentDidMount() {
    this.props.fetchIntervencoesColmeiasByApiario(this.state.apiaryId);
  }

  handleRefresh = () => {
    this.props.fetchIntervencoesColmeiasByApiario(this.state.apiaryId, true);
  };

  handleReturnHome = () => {
    this.props.navigation.navigate(routes.Home);
  };

  onDetalharIntervencao = interventionHive => {
    this.props.navigation.navigate(routes.DetailsInterventionHive, {
      intervencao: interventionHive,
    });
  };

  render() {
    const { apiaryId } = this.state;
    const intervencoesByApiario = this.props.intervencoesByApiario[apiaryId] !== undefined
      ? this.props.intervencoesByApiario[apiaryId] || []
      : [];

    return (
      <Container>
        <HeaderCustomStack
          title={`Intervenções nas \nColmeias`}
          description = "Veja todas as intervenções propostas para suas colmeias"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        
        <View style = {styles.container}>
          <Text style = {styles.title}>Aqui estão as intervenções das colmeias do apiário {this.state.apiaryName}</Text>
          <ScrollView contentContainerStyle={{ width: '90%', paddingHorizontal: 20}} showsVerticalScrollIndicator = {false}>
            { intervencoesByApiario &&
              intervencoesByApiario.length > 0
              ? intervencoesByApiario.map (hiveIntervention =>
                <InterventionHive 
                  key = {hiveIntervention.id} 
                  hiveId = {hiveIntervention.id} 
                  name = {hiveIntervention.colmeia.nome}
                  interventionHive = {hiveIntervention}
                  creationDate = {hiveIntervention.created_at} 
                  openInterventionHive = {this.onDetalharIntervencao}
                  isConcluded = {hiveIntervention.is_concluido}
                  isConclusionSynced = {hiveIntervention.isConclusionSynced}
                />
                ) : (
                  <View style = {styles.container}>
                    <Image
                      style = {styles.image}
                      source={require ('../../../../images/empty.png')}
                    />
                    <Text style = {styles.textNull}>{`Nenhuma colmeia encontrada :(`}</Text>
                  </View>
                )
            }
            <View style = {{height: 100}}/>
          </ScrollView>
        </View>

      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    intervencoesByApiario: state.intervencaoState.intervencoesByApiario,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchIntervencoesColmeiasByApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterventionHiveList);