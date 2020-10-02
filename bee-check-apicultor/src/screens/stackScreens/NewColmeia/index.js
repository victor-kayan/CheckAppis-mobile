import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createColmeia } from "../../../redux/actions/colmeiaActions";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { colors, images, routes } from "../../../../assets";
import { ButtonCustom, SpinnerCustom } from "../../../componentes";
import { Container, Text, Input, Icon, Item, Toast, Root, View } from "native-base";
import ImagePicker from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";

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
    foto_uri: null
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
      this.props.navigation.navigate(routes.HiveList);
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
            

            <Item style = {{marginTop: 40, marginHorizontal: 30}}>
              <Icon style={{color: colors.theme_second}} active type="Ionicons" name="md-finger-print"/>
              <Input
                value={colmeia.nome}
                placeholder="Nome ou identificador da colmeia"
                onChangeText={nome => this.setState({colmeia: {...colmeia, nome}})}
                style = {{fontFamily: 'Montserrat Regular', fontSize: 13 }}
              />
            </Item>
            <Item style = {{marginTop: 20, marginHorizontal: 30}}>
              <Icon style={{color: colors.theme_second}} active type="MaterialIcons" name="view-headline"/>
              <Input
                value={colmeia.descricao}
                placeholder="Descrição"
                onChangeText={descricao => this.setState({ colmeia: {...colmeia, descricao}})}                
                style = {{fontFamily: 'Montserrat Regular', fontSize: 13 }}
              />
            </Item>
            <ButtonCustom
              onPress={() => this.onAddColmeia()}
              iconRight="check"
              typeIconRight="AntDesign"
              title="CADASTRAR"
              style={{ alignSelf: 'center', marginEnd: 10, marginTop: 30 }}
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

{/* <Item style = {styles.viewImage}>
            {foto_uri ? (
              <Image style={styles.imageFormColmeia} source={foto_uri} />
            ) : (
              <View>
                <Icon
                  type="EvilIcons"
                  name="camera"
                  active
                  style={{
                    fontSize: 40,
                    paddingTop: 55,
                    color: "#B8B8B8",
                    alignText: 'center',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}
                />
                <Text  style={{ color: "#B8B8B8", paddingBottom: 55, fontFamily: 'Montserrat Regular', fontSize: 15}}>Sem foto</Text>
              </View>
            )}
          </Item> */}


{/* <SpinnerCustom visible={loading} />
            <CardItem>
              <Body>
                <Item style={{ marginTop: 130}}>
                  <Icon
                    style={{
                      color: colors.theme_second
                    }}
                    active
                    type="Ionicons"
                    name="md-finger-print"
                  />
                  <Input
                    value={colmeia.nome}
                    placeholder="Nome ou identificador da colmeia"
                    onChangeText={nome =>
                      this.setState({
                        colmeia: { ...colmeia, nome }
                      })
                    }
                    style = {{fontFamily: 'Montserrat Regular', fontSize: 13}}
                  />
                </Item>
                <Item style={{ marginTop: 20 }}>
                  <Icon
                    active
                    style={{
                      color: colors.colorIcons
                    }}
                    type="MaterialIcons"
                    name="view-headline"
                  />
                  <Input
                    value={colmeia.descricao}
                    placeholder="Descrição"
                    onChangeText={descricao =>
                      this.setState({
                        colmeia: { ...colmeia, descricao }
                      })
                    }
                    style = {{fontFamily: 'Montserrat Regular', fontSize: 13}}
                  />
                </Item>
                
                <ButtonCustom
                  onPress={() => this.onAddColmeia()}
                  iconRight="check"
                  typeIconRight="AntDesign"
                  title="CADASTRAR"
                  style={{
                    alignSelf: 'center',
                    marginEnd: 10,
                    marginTop: 40, 
                  }}
                />
              </Body>
            </CardItem> */}

            {/* <Button
          full
          rounded
          onPress={this.slectPhoto.bind(this)}
          style={{
            backgroundColor: colors.theme_second,
            marginTop: 385,
            position: 'absolute',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <LinearGradient
            colors={[colors.theme_default, colors.theme_second]}
            style={{ height: '100%', borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
          >
            <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 12 }}>TIRAR OU SELECIONAR FOTO</Text>
          </LinearGradient>
        </Button> */}