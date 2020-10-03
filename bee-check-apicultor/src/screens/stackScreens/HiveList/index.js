import React, { Component } from "react";
import { Image, ScrollView, StatusBar, Alert, TouchableHighlight } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteColmeiaById, getColmeiasByApiario } from "../../../redux/actions/colmeiaActions";

import LinearGradient from "react-native-linear-gradient";
import { SpinnerCustom } from "../../../componentes";
import { colors, routes } from "../../../../assets";
import { Icon, Container, Text, View } from "native-base";
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

  // recarregar a página
  handleRefresh() {
    this.fetchColmeias();
  }

  // pegar todas as colmeias do apiário selecionado
  fetchColmeias() {
    this.props.getColmeiasByApiario(this.state.selectedApiary.id);
  }

  // abrir tela de cadastro de nova colmeia
  openNewHive = () => {
    this.props.navigation.navigate(routes.NewColmeia, {
      apiaryId: this.state.selectedApiary.id
    });
  };

  // abrir tela de edição de uma nova colmeia
  openEditHive = hive => {
    this.props.navigation.navigate(routes.EditColmeia, {hive});
  };

  // deletar uma colmeia
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
            const apiaryId = this.state.selectedApiary.id;
            
            this.props.deleteColmeiaById(hiveId, apiaryId);
          }
        }},
      ],
      {cancelable: false},
    );
  };

  render() {
    const { selectedApiary } = this.state;
    const { loading } = this.props;

    // lista de colmeias referente ao apiário selecionado
    const colmeias = selectedApiary
      ? this.props.colmeias[selectedApiary.id]
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

        <SpinnerCustom visible={loading} />

        <View style = {styles.containerContentHives}>
          <Text style = {styles.title}>Aqui estão todas as colmeias do apiário {this.state.selectedApiary.nome}</Text>
          <View style = {styles.contentHive}>
            <View style = {[styles.triangle,styles.arrowUp]}/>
            <ScrollView contentContainerStyle={{ width: '100%'}}>
              { !colmeias || colmeias == '' ?
                (
                  <>
                    <Image
                      style = {styles.image}
                      source={require ('../../../../images/empty.png')}
                    />
                    <Text style = {styles.textNull}>{`Nenhuma colmeia encontrada. Recarregue a página ou cadastre uma nova colmeia :)`}</Text>
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
                  </>
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
              <View style = {{height: 200}}/>
            </ScrollView>
          </View>
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