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
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";
import Apiary from "../../../componentes/Apiary";
import InterventionHIve from "../../../componentes/InterventionHive";
// import moment from "moment";
// import "moment/locale/pt-br";

class InterventionHiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        apiaryId: this.props.navigation.getParam("apiaryId"),
        apiaryName: this.props.navigation.getParam("name"),
        selectedPickerApiario: null,
    };
  }

  componentDidMount() {
    this.handleRefresh();
    alert(this.state.apiaryId);
  }

  handleRefresh = () => {
    this.fecthIntervencoesColmeias(this.state.apiaryId);
  };

  fecthIntervencoesColmeias = (apiaryId) => {
    this.props.fecthIntervencoesColmeiasByApiario(apiaryId);
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

  render() {
    const { apiarios, loading } = this.props;
    const { intervencoesByApiario } = this.props;

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
          
            <View style = {styles.container}>
            <Text style = {styles.title}>Aqui estão as intervenções das colmeias do apiário {this.state.apiaryName}</Text>
            <View style = {styles.containerContent}>
                {
                    intervencoesByApiario && intervencoesByApiario.map (hive =>
                    <InterventionHIve 
                        key = {hive.id} 
                        hiveId = {hive.id} 
                        hiveName = {hive.nome} 
                        description = {apiary.descricao} 
                        openList = {this.openHiveList}/>
                    )
                }
            </View>
            </View>

      </Container>
    );
  }
}

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
)(InterventionHiveList);


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
