import React, { Component } from "react";
import { Image } from "react-native";
import { Container, Content, Text, View } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fecthIntervencoesByApicultor,
  concluirIntervencao
} from "../../../redux/actions/intervencaoActions";
import {
  HeaderCustom,
  SpinnerCustom,
  ButtonCustom
} from "../../../componentes";
import { images, routes } from "../../../../assets";
import { ItemLista } from "./ItemLista";
import styles from "./styles";
import Intervention from "../../../componentes/Intervention";

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

  onDetalharIntervencao = intervencao => {
    this.props.navigation.navigate(routes.DetalhesIntervencao, {
      intervencao: intervencao,
      routeOnSuccessConcluir: routes.IntervencaoApiario,
      onConcluirIntervencao: this.props.concluirIntervencao
    });
  };

  render() {
    const { loading, intervencoes } = this.props;

    return (
      <Container>
        <HeaderCustom
          title="Intervenções"
          description = "Veja todas as intervenções propostas para seus apiários"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <SpinnerCustom visible={loading} />
        <View style = {styles.container}>
          {
            intervencoes && intervencoes.map ( (intervention, index) =>
              <Intervention 
                key = {index} 
                interId = {intervention.id} 
                apiaryName = {intervention.apiario.nome} 
              />
            )
          }

        </View>
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
    { fecthIntervencoesByApicultor, concluirIntervencao },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervencaoApiario);


// {!intervencoes || intervencoes.lenght <= 0 ? (
//   <View
//     style={{
//       flex: 1,
//       marginHorizontal: "8%",
//       marginTop: "20%",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "space-between"
//     }}
//   >
//     <View>
//       <Text>
//         No monento não há nenhuma Intervenção para seu(s) Apiario(s)
//       </Text>
//     </View>
//     <View>
//       <Image source={images.home.checked} />
//     </View>
//     <ButtonCustom
//       onPress={() => this.props.navigation.navigate(routes.Home)}
//       iconLeft="home"
//       typeIconLeficonLeft="AntDesign"
//       title="Retornar a tela inical"
//       style={{
//         alignSelf: "flex-end",
//         marginHorizontal: "8%"
//       }}
//     />
//   </View>
// ) : (
//   <Content padder scrollEnabled={true}>
//     {intervencoes &&
//       intervencoes.map((intervencao, index) => (
//         <ItemLista
//           handleOnPressDetalhar={this.onDetalharIntervencao}
//           key={index}
//           intervencao={intervencao}
//         />
//       ))}
//   </Content>
// )}