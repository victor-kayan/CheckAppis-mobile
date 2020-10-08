import React, { Component } from "react";
import { ScrollView, TouchableOpacity, Alert } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { concluirIntervencaoColmeia } from "../../../redux/actions/intervencaoActions";

import moment from "moment";
import "moment/locale/pt-br";

import { Container, View, Text, Icon } from "native-base";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";
import ModalConfirm from "../../../componentes/ModalConfirm";
import ModalFeedback from "../../../componentes/ModalFeedback";
import { images } from "../../../../assets";

class DetailsInterventionHive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concluindoIntervencao: false,
      modalConfirm: false,
      modalFeedback: false,
    };
  }

  // abrir modal de confirmação 
  openModalConfirm = () => {
    this.setState({modalConfirm: true});
  };

  // fechar modal de confirmação
  closeModalConfirm = () => {
    this.setState({modalConfirm: false});
  };

  // abrir modal de feedback de exlcusão 
  openModalFeedback = () => {
    this.setState({modalFeedback: true});
  };

  // fechar modal de feedback de exlcusão
  closeModalFeedback = () => {
    this.setState({modalFeedback: false});
  };

  handleConcludeIntervention = intervention => {
    this.props.concluirIntervencaoColmeia(intervention);
    this.setState({ isConcludingIntervention: true });
    this.closeModalConfirm();
    this.openModalFeedback();  
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
            <Text style = {styles.hiveName}>{intervencao.colmeia.nome}</Text>
          </View>

          <View style = {styles.containerContent}>
            <ScrollView contentContainerStyle={{width: '100%'}} showsVerticalScrollIndicator = {false}>

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
                <View style = {styles.viewPrescription}>
                  <Text style = {styles.title}>Prescrição</Text>
                  <Text style = {styles.description}>{intervencao.descricao}</Text>
                </View>
              </View>

              { intervencao.is_concluido || this.state.isConcludingIntervention ? (
                  <TouchableOpacity onPress = {() => this.openModalFeedback()} style = {styles.button}>
                    <Text style = {styles.textButton}>Intervenção concluída</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress = {() => this.openModalConfirm()} style = {styles.button}>
                    <Text style = {styles.textButton}>Marcar como concluída</Text>
                    <Icon type="AntDesign" name="check" style={styles.iconsCheck}/>
                  </TouchableOpacity>
                )
              }

              <View style = {{height: 70}}/>
            </ScrollView>
          </View>
        </View>

          <ModalConfirm
            modalVisible = {this.state.modalConfirm}
            onCancel = {this.closeModalConfirm}
            onConfirm = {() => this.handleConcludeIntervention(intervencao)}
            title = 'Concluir Intervenção'
            text = 'Tem certeza que deseja concluir esta intervenção?'
            button = 'Concluir'
          />

          <ModalFeedback
            modalVisible = {this.state.modalFeedback}
            onCancel = {this.closeModalFeedback}
            gif = {images.gif.intervention}
            title = 'Intervenção concluída com sucesso'
            text = 'Você resolveu a intervenção prescrita para esta colmeia e ela foi concluída com sucesso.'
          />

      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { concluirIntervencaoColmeia },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsInterventionHive);


