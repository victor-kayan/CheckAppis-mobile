import React, { Component } from "react";
import { Image, ScrollView, StatusBar, TouchableHighlight } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getColmeiasByApiario } from "../../../redux/actions/colmeiaActions";

import LinearGradient from "react-native-linear-gradient";
import { Icon, Container, Text, View } from "native-base";
import { colors, routes } from "../../../../assets";
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
    // pegar todas as colmeias do apiário selecionado
    this.props.getColmeiasByApiario(this.state.selectedApiary.id);
  }

  // recarregar a página
  handleRefresh() {
    this.props.getColmeiasByApiario(this.state.selectedApiary.id, true);
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

  openHiveDetails = (hive, apiary) => {
    this.props.navigation.navigate(routes.HiveDetails, {hive, apiary});
  }

  render() {
    const { selectedApiary } = this.state;

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

        <View style = {styles.containerContentHives}>

          <Text style = {styles.title}>Aqui estão todas as colmeias do apiário {this.state.selectedApiary.nome}</Text>
          <View style = {styles.contentHive}>
            <View style = {[styles.triangle,styles.arrowUp]}/>
            <ScrollView contentContainerStyle={{ width: '100%'}} showsVerticalScrollIndicator = {false}>
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
                      apiary = {selectedApiary} 
                      openHiveDetails = {this.openHiveDetails}
                    />
                  )
                )
              }
              <View style = {{height: 120}}/>
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
    colmeias: state.colmeiaState.colmeias
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getColmeiasByApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HiveList);