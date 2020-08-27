import React, { Component } from "react";
import { Image, ScrollView, StatusBar, Alert, TouchableHighlight } from "react-native";
import {
  Icon,
  Card,
  CardItem,
  Container,
  Content,
  Picker,
  Text,
  Thumbnail,
  Button,
  Row,
  View,
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { SwipeRow } from 'react-native-swipe-list-view';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActionButton from "react-native-action-button";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import {
  RemoveDialog,
  SpinnerCustom
} from "../../../componentes";
import {
  getVisitasByApiario
} from "../../../redux/actions/visitaActions";
import { colors, routes, images } from "../../../../assets";
import styles from "./styles";
import Hive from "../../../componentes/Hive";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import Visit from "../../../componentes/Visit";


class VisitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visita: {},
      apiaryId: this.props.navigation.getParam('apiaryId'),
      apiaryName: this.props.navigation.getParam('name'),
      dialogVisible: false,
      selectedPickerApiario: true,
    };
  }

  componentDidMount() {
    this.fecthVisita(this.state.apiaryId);    
  };

  fetchApiarios() {
    this.props.fetchApiariosByUser();
  }

  handleRefresh = () => {
    this.fecthVisita(this.state.apiaryId);
  };

  fecthVisita(id) {
    this.props.getVisitasByApiario({ id });
  };

  handleDelete = () => {
    this.setState({ dialogVisible: false });
    this.props.deleteVisita({
      visita_id: this.state.visita.id,
      apiario_id: this.state.selectedPickerApiario.id
    });
  };

  openNewVisit = (apiaryId) => {
    this.props.navigation.navigate(routes.NewVisitaApiario, {apiaryId});
  };

  openVisitDetails = (visit, apiaryId, apiaryName) => {
    this.props.navigation.navigate(routes.DetalhesVisita, {visit, apiaryId: this.state.apiaryId, apiaryName: this.state.apiaryName});
  };

  handleDetalhar = visita => {
    this.props.navigation.navigate(routes.DetalhesVisita, {
      visita, apiario: this.state.selectedPickerApiario
    });
  };

  render() {
    const { selectedPickerApiario, dialogVisible } = this.state;
    const { apiarios, loading } = this.props;
    const { visitas } = selectedPickerApiario == null ? [] : this.props;

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
          <SpinnerCustom visible={loading} />
        <View style = {styles.containerContentVisits}>
          <Text style = {styles.title}>Aqui estão todas as visitas realizadas no apiário {this.state.apiaryName}</Text>
        </View>
            <ScrollView contentContainerStyle={{ width: '100%', padding: 5, }}>
            {
                visitas.map (visit =>
                <Visit 
                    key = {visit.id} 
                    visitId = {visit.id} 
                    date = {visit.created_at} 
                    hives = {visit.visita_colmeias}
                    hivesLength = {visit.visita_colmeias.length}  
                    visit = {visit}
                    openVisitList = {this.openVisitDetails}
                />
                )
            }
            <View style = {{height: 120}}/>
            </ScrollView>
        

        <View style = {styles.addVisitButton}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="#ff8500"
            onPress={() => this.openNewVisit(this.state.apiaryId)}
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
        apiarios: state.apiarioState.apiarios,
        visitas: state.visitaState.visitas,
        loading: state.apiarioState.loading || state.visitaState.visitaIsLoading
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchApiariosByUser, getVisitasByApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitList);