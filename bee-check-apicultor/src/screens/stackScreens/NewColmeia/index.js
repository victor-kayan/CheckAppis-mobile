import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createColmeia } from "../../../redux/actions/colmeiaActions";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Container, Input, Icon, Item, Toast, Root, View } from "native-base";
import { ButtonCustom, SpinnerCustom } from "../../../componentes";
import { colors, routes } from "../../../../assets";
import ImagePicker from "react-native-image-picker";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";
import ModalCheck from "../../../componentes/ModalCheck";

const options = {
  title: "Imagem da colmeia",
  takePhotoButtonTitle: "Tirar uma nova foto",
  chooseFromLibraryButtonTitle: "Selecionar foto na galeria",
  quality: 0.5,
};

class NewColmeia extends Component {

  state = {
    colmeia: {
      descricao: "",
      nome: ""
    },
    foto: {},
    foto_uri: null,
    modalVisible: false,
  };

  openModal = () => {
    this.setState({modalVisible: true});
  };

  closeModal = () => {
    this.setState({modalVisible: false});
    this.props.navigation.navigate(routes.HiveList);
  };

  // adicionar a colmeia
  onAddColmeia = () => {
    const { colmeia, foto } = this.state;
    const { createColmeia } = this.props;

    if (colmeia.nome == "" || colmeia.descricao == "") {
      Toast.show({
        text: "Preencha todos os campos!",
        textStyle: { marginLeft: 40 },
        position: "bottom",
        type: "danger"
      });
    } else {
      const uploadedPhoto = foto.fileName !== undefined && foto.data !== undefined 
        ? { fileName: foto.fileName, data: foto.data }
        : {};

      const newHiveData = {
        uuid: uuidv4(),   // Identificador universal único para diferenciar cada colmeia mesmo antes de ser sincronizada.
        isSynced: false,  // Propriedade que define se a colmeia está sincronizada ou não. Por padrão é definida como "false" pois inicialmente será salvo localmente.
        nome: colmeia.nome,
        descricao: colmeia.descricao,
        foto: uploadedPhoto,
        apiario_id: this.props.navigation.getParam("apiaryId")
      }

      createColmeia(newHiveData);

      this.clearInputs();
      this.openModal();
    }
  };

  // limpar nome e descrição
  clearInputs = () => {
    this.setState({ foto: {}, foto_uri: null });
    this.setState({ colmeia: { descricao: "", nome: "" } });
  };

  // selecionar imagem da colmeia
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
    const { loading } = this.props;
    const { colmeia, foto_uri } = this.state;
    return (
      <Root>
        <Container>
          <HeaderCustomStack
            title = "Cadastro de Colmeia"
            description = "Insira as informações solicitadas e crie uma nova colmeia"
          />

          <SpinnerCustom visible={loading} />

          <View style = {styles.containerContent}>
            <View style = {styles.viewImage}>
              {foto_uri ? (
                <Image style={styles.imageFormColmeia} source={foto_uri} />
              ) : (
                <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon
                    type="Entypo"
                    name="camera"
                    active
                    style={{
                      fontSize: 50,
                      color: "#B8B8B8",
                      alignText: 'center',
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}
                  />
                </View>
              )}
            </View>

            
            <TouchableOpacity onPress={this.slectPhoto.bind(this)} style = {styles.addPhoto}>
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
              onPress={() => this.onAddColmeia()}
              iconRight="check"
              typeIconRight="AntDesign"
              title="CADASTRAR"
              style={{ alignSelf: 'center', marginEnd: 10, marginTop: 40 }}
            />

            <ModalCheck
              modalVisible = {this.state.modalVisible}
              onCancel = {this.closeModal}
              title = 'Colmeia criada com Sucesso!'
              text = 'Sua colmeia foi criada com sucesso. Agora, é só ir para a lista de colmeias para visualizá-la.'
            />

          </View>
        </Container>
      </Root>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loading: state.apiarioState.loading || state.colmeiaState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createColmeia }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewColmeia);