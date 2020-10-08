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
import ModalFeedback from "../../../componentes/ModalFeedback";

class HiveDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hive: this.props.navigation.getParam("hive", ""),
      apiary: this.props.navigation.getParam("apiary", ""),
      modalVisible: false,
      modalVisibleTrash: false,
      modalVisibleSync: false,
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

  // abrir modal de feedback de exlcusão 
  openModalTrash = () => {
    this.setState({modalVisibleTrash: true});
  };

  // fechar modal de feedback de exlcusão
  closeModalTrash = () => {
    this.setState({modalVisibleTrash: false});
    this.props.navigation.navigate(routes.HiveList);
  };

  // abrir modal de status de sincronização
  openModalSync = () => {
    this.setState({modalVisibleSync: true});
  };

  // fechar modal de status de sincronização
  closeModalSync = () => {
    this.setState({modalVisibleSync: false});
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
            { typeof(hive.foto) === 'string' ? (  // Colmeia já sincronizada. 'image' é o link da imagem no Amazon AWS.
                <Image source = {{uri: hive.foto}} style = {styles.imageFormColmeia}/>
              ) : hive.foto.data ? (  // Colmeia ainda não sincronizada e possui imagem. 'image.data' é a imagem em Base64.
                <Image
                  source = {{uri: `data:image/png;base64,${hive.foto.data}`}}
                  style = {styles.imageFormColmeia}
                />
              ) : ( // Colmeia ainda não cadastra e não possui imagem.
                <Image source = {images.fotoDefault} style = {styles.imageFormColmeia}/>
              )
            }
          </View>

          
          <TouchableOpacity onPress={() => this.openModalSync()} style = {styles.changePhoto}>
            { hive.isSynced ? ( // Colmeia SINCRONIZADA
                <Icon style={{color: colors.white, fontSize: 25}} active type="AntDesign" name="checkcircleo"/>
              ) : hive.permanentlyFailed ? (  // Criação da colmeia FALHOU PERMANENTEMENTE
                <Icon style={{color: colors.white, fontSize: 25}} active type="AntDesign" name="closecircleo"/>
              ) : hive.isSynced === false && ( // Colmeia AINDA NÃO SINCRONIZADA
                <Icon style={{color: colors.white, fontSize: 25}} active type="AntDesign" name="clockcircleo"/>
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
            text = 'Tem certeza que deseja excluir esta colmeia permanentemente?'
            button = 'Excluir'
          />

          <ModalFeedback
            modalVisible = {this.state.modalVisibleTrash}
            onCancel = {this.closeModalTrash}
            gif = {images.gif.trash}
            title = 'Colmeia excluída com sucesso'
            text = 'A colmeia selecionada foi excluída com sucesso e, por isso, não poderá mais ser usada.'
          />

          <ModalFeedback
            modalVisible = {this.state.modalVisibleSync}
            onCancel = {this.closeModalSync}
            gif = {images.gif.sync}
            title = 'Status de Sincronização'
            text = { hive.isSynced ? ('Sua colmeia está seguramente sincronizada. Todos os dados estão guardados de forma segura.') : hive.permanentlyFailed ? ('A sincronização da sua colmeia falhou permanentemente.') : hive.isSynced === false && ('Aguardando conexão com a internet para sincronizar sua colmeia.')}
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