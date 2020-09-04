import React, { Component } from "react";
import { Image, 
  ScrollView, 
  StatusBar, 
  Alert, 
  TouchableHighlight
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteColmeiaById, getColmeiasByApiario } from "../../../redux/actions/colmeiaActions";

import LinearGradient from "react-native-linear-gradient";
import { SpinnerCustom } from "../../../componentes";
import { colors, routes } from "../../../../assets";
import {
  Icon,
  Container,
  Text,
  View,
} from "native-base";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import Hive from "../../../componentes/Hive";
import styles from "./styles";

class HiveList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmeia: {},
      selectedApiary: this.props.navigation.getParam('selectedApiary'),
      selectedPickerApiario: true,
    };
  }

  componentDidMount() {
    this.fetchColmeias();
  }

  handleRefresh() {
    this.fetchColmeias();
  }

  fetchColmeias() {
    this.props.getColmeiasByApiario(this.state.selectedApiary.id);
  }

  openNewHive = () => {
    this.props.navigation.navigate(routes.NewColmeia, {
      apiaryId: this.state.selectedApiary.id
    });
  };

  openEditHive = hive => {
    this.props.navigation.navigate(routes.EditColmeia, {hive});
  };

  deleteColmeia = hiveId => {
    Alert.alert(
      'Excluir Colmeia',
      'Tem certeza que deseja exlcuir essa Colmeia?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          if (this.state.colmeia) {
            const { apiario_id } = this.state.colmeia;
            this.props.deleteColmeiaById({ hiveId, apiario_id });
          }
        }},
      ],
      {cancelable: false},
    );
  };

  render() {
    const { selectedApiary } = this.state;
    const { loading } = this.props;
    
    const colmeias = selectedApiary
      ? this.props.colmeias[selectedApiary.id] // Lista de colmeias referente ao apiário selecionado
      : [];

    return (
      <Container>
        <StatusBar backgroundColor={colors.theme_default} />
          <HeaderCustomStack
            title="Colmeias"
            description="Aqui, você pode visualizar, cadastrar e gerenciar qualquer colmeia no apiário selecionado"
            iconRight="sync"
            handleIconRight={() => this.handleRefresh()}
            typeIconRight="AntDesign"
          />
        <View style = {styles.containerContentHives}>
          <Text style = {styles.title}>Aqui estão todas as colmeias do apiário {this.state.selectedApiary.nome}</Text>
        </View>
        <View style = {styles.contentHive}>
        <View style = {[styles.triangle,styles.arrowUp]}/>
            <ScrollView contentContainerStyle={{ width: '90%', padding: 5,}}>
            <SpinnerCustom visible={loading} />
            { !colmeias || colmeias == '' ?
            (
              <View style = {styles.container}>
                <Image
                  style = {styles.image}
                  source={require ('../../../../images/empty.png')}
                />
                <Text style = {styles.textNull}>Nenhuma colmeia encontrada :(</Text>
              </View>
            ) : (
              colmeias.map (hive =>
                <Hive 
                  key = {hive.id} 
                  hiveId = {hive.id} 
                  name = {hive.nome} 
                  description = {hive.descricao} 
                  image = {hive.foto} 
                  hive = {hive} 
                  openEditHive = {this.openEditHive}
                  deleteHive = {this.deleteColmeia}
                />
              )
            )
            }
            <View style = {{height: 120}}/>
            </ScrollView>
        </View>

        <View style = {styles.addHiveButton}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="#ff8500"
            onPress={this.openNewHive}
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
    loading: state.apiarioState.loading || state.colmeiaState.loading,
    colmeias: state.colmeiaState.colmeias
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { deleteColmeiaById, getColmeiasByApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HiveList);