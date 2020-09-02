import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchApiariosHasColmeiasHasIntervencoes } from "../../../redux/actions/apiarioActions";
import {
  fecthIntervencoesColmeiasByApiario,
  concluirIntervencaoColmeia
} from "../../../redux/actions/intervencaoActions";
import { Text, Container, Content, Card, CardItem, View } from "native-base";
import { Image } from "react-native";
import { images, routes } from "../../../../assets";
import { HeaderCustom, SpinnerCustom } from "../../../componentes";
import { RenderSelectApiario } from "./RenderSelectApiario";
import { ColmeiasSemIntervencao } from "./ColmeiasSemIntervencao";
import { ItemLista } from "./ItemLista";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";
import Apiary from "../../../componentes/Apiary";
import InterventionHIve from "../../../componentes/InterventionHive";
// import moment from "moment";
// import "moment/locale/pt-br";

class IntervencaoColmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPickerApiario: null
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh = () => {
    this.props.fetchApiariosHasColmeiasHasIntervencoes();
  };

  handleValueChangePickerApiario = apiario => {
    this.setState({ selectedPickerApiario: apiario });

    if (apiario) {
      this.fecthIntervencoesColmeias(apiario.id);
    }
  };

  fecthIntervencoesColmeias = apiario_id => {
    this.props.fecthIntervencoesColmeiasByApiario({ apiario_id });
  };

  handleReturnHome = () => {
    this.props.navigation.navigate(routes.Home);
  };

  onDetalharIntervencao = intervencao => {
    this.props.navigation.navigate(routes.DetalhesIntervencao, {
      intervencao: intervencao,
      routeOnSuccessConcluir: routes.IntervencaoColmeia,
      onConcluirIntervencao: this.props.concluirIntervencaoColmeia
    });
  };

  openInterventionHiveList = (apiaryId, name) => {
    this.props.navigation.navigate(routes.InterventionHiveList, {apiaryId, name})
  };

  render() {
    const { selectedPickerApiario } = this.state;
    const { apiarios, loading } = this.props;
    const { intervencoesByApiario } =
      selectedPickerApiario == null ? [] : this.props;

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
                <Text style = {styles.textNull}>Nã há intervenções nas colmeias dos seus apiários :)</Text>
              </View>
            ) : (
              <View style = {styles.container}>
                <Text style = {styles.title}>Selecione o apiário do qual deseja ver as intervenções das colmeias</Text>
                <View style = {styles.containerContent}>
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
                </View>
              </View>
            )
            }
      </Container>
    );
  }
}

// export default Visita;
function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    intervencoesByApiario: state.intervencaoState.intervencoesByApiario,
    loading: state.apiarioState.loading || state.intervencaoState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchApiariosHasColmeiasHasIntervencoes,
      fecthIntervencoesColmeiasByApiario,
      concluirIntervencaoColmeia
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervencaoColmeia);


// {!apiarios ? (
//   <ColmeiasSemIntervencao onReturnHome={this.handleReturnHome} />
// ) : (
//   <Content padder scrollEnabled={true}>
//     <Card>
//       <CardItem>
//         <RenderSelectApiario
//           apiarios={apiarios}
//           onValueChangePickerApiario={
//             this.handleValueChangePickerApiario
//           }
//           selectedPickerApiario={selectedPickerApiario}
//         />
//       </CardItem>
//     </Card>
//     {!loading &&
//     intervencoesByApiario &&
//     intervencoesByApiario.length > 0
//       ? intervencoesByApiario.map((intervencao, index) => (
//           <ItemLista
//             handleOnPressDetalhar={this.onDetalharIntervencao}
//             key={index}
//             intervencao={intervencao}
//           />
//         ))
//       : !loading &&
//         !selectedPickerApiario &&
//         !selectedPickerApiario > 0 && (
//           <>
//             <CardItem
//               style={{
//                 marginTop: 20,
//                 flexDirection: "column",
//                 alignItems: "center"
//               }}
//             >
//               <Text>Nenhuma colmeia</Text>
//             </CardItem>
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center"
//               }}
//             >
//               <Image
//                 style={{ marginTop: "15%" }}
//                 source={images.home.apiario}
//               />
//             </View>
//           </>
//         )}
//   </Content>
// )}
