import React from "react";
import { TouchableOpacity, ScrollView, Alert, TouchableHighlight, Image } from "react-native";
import { Container, View, Text, Icon, Item } from "native-base";
import { colors, images, routes } from "../../../../assets";
import { bindActionCreators } from "redux";
import styles from "./styles";
import "moment/locale/pt-br";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import { deleteColmeiaById } from "../../../redux/actions/colmeiaActions";
import { connect } from "react-redux";
import ModalConfirm from "../../../componentes/ModalConfirm";
import ModalTrash from "../../../componentes/ModalFeedback";

class HiveDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hive: this.props.navigation.getParam("hive", ""),
      apiary: this.props.navigation.getParam("apiary", ""),
      modalVisible: false,
      modalVisibleTrash: false,
    };
  }

  // abrir modal de confirmação 
  openModal = () => {
    this.setState({modalVisible: true});
  };

  // fechar modal de confirmação
  closeModal = () => {
    this.setState({modalVisible: false});
  };

  // abrir modal de confirmação 
  openModalTrash = () => {
    this.setState({modalVisibleTrash: true});
  };

  // fechar modal de confirmação
  closeModalTrash = () => {
    this.setState({modalVisibleTrash: false});
    this.props.navigation.navigate(routes.HiveList);
  };

  // mostrar status de sincronização
  showStatus = () => {
    {
      this.state.visit.isSynced ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'Sua visita foi sincronizada com sucesso.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : this.state.visit.permanentlyFailed ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'A sincronização da visita falhou permanentemente. Por favor, delete a visita ou realize uma nova.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : 
      (
        Alert.alert(
          'Status de Sincronização',
          'Aguardando conexão com a internet para sincronizar a visita.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
    }
  };

  openEditHive = hive => {
    this.props.navigation.navigate(routes.EditColmeia, {hive});
  };

  deleteHive = hiveId => {
    if (this.state.hive) {
      const apiaryId = this.state.apiary.id;
      this.props.deleteColmeiaById(hiveId, apiaryId);
      this.closeModal();
      this.openModalTrash();
    }
  };

  showStatus = () => {
    {
      this.state.hive.isSynced ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'Sua colmeia está sincronizada.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : this.state.hive.permanentlyFailed ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'A sincronização da colmeia falhou permanentemente. Por favor, delete a visita ou realize uma nova.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : 
      (
        Alert.alert(
          'Status de Sincronização',
          'Aguardando conexão com a internet para sincronizar a colmeia.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
    }
  };

  render() {
    const hiveId = this.props.navigation.getParam("hive", "").id;
    const hive = this.props.navigation.getParam("hive", "");
    const hiveName = this.props.navigation.getParam("hive", "").nome;
    const hiveDescription = this.props.navigation.getParam("hive", "").descricao;

    return (
      <Container>
        <HeaderCustomStack 
          title="Detalhes"
          description="Aqui, você pode editar os dados da sua colmeia ou excluí-los"
          typeIconRight = "AntDesign"
          iconRight = "delete"
          handleIconRight = {() => this.openModal(hiveId)}
          typeIconRight2 = "AntDesign"
          iconRight2 = "edit"
          handleIconRight2 = {() => this.openEditHive(hive)}
        />

        <View style = {styles.containerContent}>
          <View style = {styles.viewImage}>
            <Image style={styles.imageFormColmeia} source={{ uri: hive.foto}}/>
          </View>

          
          <TouchableOpacity onPress={() => this.showStatus()} style = {styles.changePhoto}>
            { hive.isSynced ? ( // Colmeia SINCRONIZADA
                <Icon style={{color: colors.white, fontSize: 25}} active type="AntDesign" name="check"/>
              ) : hive.permanentlyFailed ? (  // Criação da colmeia FALHOU PERMANENTEMENTE
                <Icon style={{color: colors.white, fontSize: 25}} active type="AntDesign" name="close"/>
              ) : hive.isSynced === false && ( // Colmeia AINDA NÃO SINCRONIZADA
                <Icon style={{color: colors.white, fontSize: 25}} active type="AntDesign" name="exclamation"/>
              )
            }
          </TouchableOpacity> 
          

          <View style = {styles.viewInformations}>
            <Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, textAlign: 'center' }}>{hiveName}</Text>
            <Text style = {{fontFamily: 'Montserrat-Medium', fontSize: 14, textAlign: 'center' }}>{hiveDescription}</Text>
          </View>

          <ModalConfirm
            modalVisible = {this.state.modalVisible}
            onCancel = {this.closeModal}
            onConfirm = {() => this.deleteHive(hiveId)}
            title = 'Excluir Colmeia'
            text = 'Tem certeza que deseja excluir esta colmeia?'
          />

          <ModalTrash
            modalVisible = {this.state.modalVisibleTrash}
            onCancel = {this.closeModalTrash}
            gif = {images.gif.trash}
            title = 'Colmeia excluída com sucesso'
            text = 'A colmeia selecionada foi excluída com sucesso e, por isso, não poderá mais ser usada.'
          />
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteColmeiaById }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HiveDetails);