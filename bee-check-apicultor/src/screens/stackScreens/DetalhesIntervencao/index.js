import React, { Component } from "react";
import { ScrollView, TouchableOpacity, Alert } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { concluirIntervencao } from "../../../redux/actions/intervencaoActions";

import moment from "moment";
import "moment/locale/pt-br";

import { Container, View, Text, Icon } from "native-base";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";

import tron from '../../../config/reactotronConfig'

class DetalhesIntervencao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConcludingIntervention: false,
    };
  }

  // ! Não está sendo disparado...
  componentWillReceiveProps(nextProps) {
    tron.log('componentWillReceiveProps', nextProps)

    if (this.isConcludingIntervention && nextProps.interventionConclusionFailed) {
      this.setState({ isConcludingIntervention: false });
      
      tron.log(this.isConcludingIntervention, this.props.navigation.getParam("intervencao", ""))
    }
  }

  handleConcludeIntervention = intervention => {
    Alert.alert(
      'Concluir Intervenção',
      'Tem certeza que deseja concluir esta intervenção?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK',  onPress: () => {
          this.props.concluirIntervencao(intervention);
          this.setState({ isConcludingIntervention: true });
        }},
      ],
      {cancelable: false},
    );
  }

  render() {
    const intervencao = this.props.navigation.getParam("intervencao", "");

    return (
      <Container>
        <HeaderCustomStack 
          title="Detalhes"
          description = "Veja todos os detalhes da intervenção selecionada anteriormente" 
        />
        <View style = {styles.container}>
          <View style = {styles.viewInformations}>
            <Text style = {styles.informations}>Informações</Text>
          </View>
          
          <View style = {styles.containerContent}>
            <ScrollView contentContainerStyle={{width: '100%'}}>
              <View style = {styles.cardInformation}>
                <Icon type="AntDesign" name="calendar" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Data de realização</Text>
                  <Text style = {styles.description}>{moment(intervencao.created_at).format("DD")} de {moment(intervencao.created_at).format("MMMM")} de {moment(intervencao.created_at).format("YYYY")}</Text>
                </View>
              </View>

              <View style = {styles.cardInformation}>
                <Icon type="AntDesign" name="user" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Técnico responsável</Text>
                  <Text style = {styles.description}>{intervencao.tecnico.name}</Text>
                </View>
              </View>

              <View style = {styles.cardInformation}>
                <Icon type="AntDesign" name="clockcircleo" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Prazo para aplicação</Text>
                  <Text style = {styles.description}>
                    {moment(intervencao.data_inicio).format("DD")} de {moment(intervencao.data_inicio).format("MMMM")} de {moment(intervencao.data_inicio).format("YYYY")}
                    {` a\n`} 
                    {moment(intervencao.data_fim).format("DD")} de {moment(intervencao.data_fim).format("MMMM")} de {moment(intervencao.data_fim).format("YYYY")}
                  </Text>
                </View>
              </View>

              <View style = {styles.cardInformation}>
                <Icon type="MaterialIcons" name="view-headline" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Prescrição</Text>
                  <Text style = {styles.description}>{intervencao.descricao}</Text>
                </View>
              </View>

              { intervencao.is_concluido || this.state.isConcludingIntervention ? (
                  <Text style={{ fontWeight: 'bold', color: 'darkgreen', textAlign: 'center' }}>
                    INTERVENÇÃO JÁ CONCLUÍDA
                  </Text>
                ) : (
                  <TouchableOpacity onPress = {() => this.handleConcludeIntervention(intervencao)} style = {styles.button}>
                    <Text style = {styles.textButton}>Marcar como concluída</Text>
                    <Icon type="AntDesign" name="check" style={styles.iconsCheck}/>
                  </TouchableOpacity>
                )
              }
              <View style = {{height: 70}}/>
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    interventionConclusionFailed: state.intervencaoState.interventionConclusionFailed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { concluirIntervencao },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetalhesIntervencao);