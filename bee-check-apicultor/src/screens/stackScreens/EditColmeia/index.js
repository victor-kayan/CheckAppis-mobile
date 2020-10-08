import React, { Component } from "react";
import {
  Container,
  Content,
  Icon,
  Body,
  CardItem,
  Item,
  Input,
  Button,
  Text,
  Toast
} from "native-base";
import { Image, Alert, View, TouchableOpacity} from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editColmeia } from "../../../redux/actions/colmeiaActions";
import { colors, routes } from "../../../../assets";
import styles from "./styles";
import { ButtonCustom, SpinnerCustom } from "../../../componentes";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import ModalCheck from "../../../componentes/ModalFeedback";


const options = {
  title: "Imagem da colmeia",
  takePhotoButtonTitle: "Tirar uma nova foto",
  chooseFromLibraryButtonTitle: "Selecionar foto na galeria",
  quality: 0.5
};

class EditColmeia extends Component {

  state = {
    colmeia: {},
    foto: null,
    foto_uri: null,
    modalVisible: false,
  };

  // abrir modal de feedback 
  openModal = () => {
    this.setState({modalVisible: true});
  };

  // fechar modal de feedback
  closeModal = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate(routes.HiveList);
  };
  
  componentDidMount() {
    this.setState({ colmeia: this.props.navigation.getParam("hive", "") });
  }

  onEditColmeia = () => {
    const { id, descricao, nome, apiario_id } = this.state.colmeia;
    const { foto } = this.state;
    if (nome == "" || descricao == "") {
      Toast.show({
        text: "Preencha todos os campos!",
        textStyle: { textAlign: 'center', fontFamily: 'Montserrat Regular' },
        position: "bottom",
        type: "danger"
      });
    } else {
      this.props.editColmeia({ id, descricao, nome, apiario_id, foto });
      this.openModal();
    }
  };

  slectPhoto = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = { uri: response.uri };
        this.setState({ foto: response, foto_uri: source });
      }
    });
  };

  render() {
    const { colmeia, foto, foto_uri } = this.state;
    const { loading } = this.props;

    return (
      <Container>
        <HeaderCustomStack 
          title="Edição"
          description="Altere as informações dessa colmeia inserindo novos dados"
        />

        <SpinnerCustom visible={loading} />

        <View style = {styles.containerContent}>
          <View style = {styles.viewImage}>
            {foto_uri ? (
              <Image style={styles.imageFormColmeia} source={foto_uri} />
            ) : (
              <Image style={styles.imageFormColmeia} source={{ uri: colmeia.foto}}/>
            )}
          </View>

          
          <TouchableOpacity onPress={this.slectPhoto.bind(this)} style = {styles.changePhoto}>
            <Icon style={{color: colors.white, fontSize: 20}} active type="Entypo" name="camera"/>
          </TouchableOpacity>
          

          <View style = {styles.viewInputs}>
            <Item>
              <Icon style={{color: colors.theme_second}} active type="Ionicons" name="md-finger-print"/>
              <Input
                value={colmeia.nome}
                placeholder="Nome ou identificador da colmeia"
                onChangeText={nome => this.setState({colmeia: {...colmeia, nome}})}
                style = {{fontFamily: 'Montserrat Regular', fontSize: 13 }}
              />
            </Item>
            <Item style = {{marginTop: 20}}>
              <Icon style={{color: colors.theme_second}} active type="MaterialIcons" name="view-headline"/>
              <Input
                value={colmeia.descricao}
                placeholder="Descrição"
                onChangeText={descricao => this.setState({ colmeia: {...colmeia, descricao}})}                
                style = {{fontFamily: 'Montserrat Regular', fontSize: 13 }}
              />
            </Item>
          </View>
          <ButtonCustom
            onPress={() => this.onEditColmeia()}
            iconRight="check"
            typeIconRight="AntDesign"
            title="SALVAR EDIÇÃO"
            style={{ alignSelf: 'center', marginEnd: 10, marginTop: 40 }}
          />

            <ModalCheck
              modalVisible = {this.state.modalVisible}
              onCancel = {this.closeModal}
              title = 'Colmeia editada com Sucesso'
              text = 'Os dados da sua colmeia foram atualizados com sucesso e estão seguramente armazenados. '
              gif = {images.gif.check}
            />
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loading: state.colmeiaState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editColmeia }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditColmeia);