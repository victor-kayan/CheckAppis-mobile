import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Content,
  CardItem,
  Body,
  Button,
  Text,
  Input,
  Icon,
  Item,
  Toast,
  Root,
  View
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createColemia } from "../../../redux/actions/colmeiaActions";
import ImagePicker from "react-native-image-picker";
import { colors, images } from "../../../../assets";
import styles from "./styles";
import {
  ButtonCustom,
  SpinnerCustom
} from "../../../componentes";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import LinearGradient from "react-native-linear-gradient";

const options = {
  title: "Imagem da colmeia",
  takePhotoButtonTitle: "Tirar uma nova foto",
  chooseFromLibraryButtonTitle: "Selecionar foto na galeria",
  quality: 0.5
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

  onAddColmeia = () => {
    const { colmeia, foto } = this.state;
    const { createColemia } = this.props;

    if (colmeia.nome == "" || colmeia.descricao == "") {
      Toast.show({
        text: "Preencha todos os campos!",
        textStyle: { marginLeft: 40 },
        position: "bottom",
        type: "danger"
      });
    } else {
      createColemia({
        descricao: colmeia.descricao,
        nome: colmeia.nome,
        foto,
        apiario_id: this.props.navigation.getParam("apiaryId")
      });
      this.clearInputs();
      // this.props.navigation.navigate(routes.ColmeiaHome);
    }
  };

  clearInputs = () => {
    this.setState({ foto: {}, foto_uri: null });
    this.setState({ colmeia: { descricao: "", nome: "" } });
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
    const { loading } = this.props;
    const { colmeia, foto_uri } = this.state;
    return (
      <Root>
        <View style = {{flex: 1, width: '100%', height: '100%', backgroundColor: 'white'}}>
        <Container style = {{position: 'absolute', alignSelf: 'center', flex: 1, width: '100%'}}>
          <HeaderCustomStack 
            title = "Cadastro"
            description = "Insira as informações solicitadas e cadastre uma nova colmeia" 
            />
          <Content padder>
            <SpinnerCustom visible={loading} />
            <CardItem>
              <Body>
                <Item style={{ marginTop: 130}}>
                  <Icon
                    style={{
                      color: colors.colorIcons
                    }}
                    active
                    type="AntDesign"
                    name="idcard"
                  />
                  <Input
                    value={colmeia.nome}
                    autoFocus = {true}
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
                    type="FontAwesome"
                    name="pencil"
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
            </CardItem>
          </Content>
          
          <Item style = {styles.viewImage}>
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
                <Text  style={{ color: "#B8B8B8", paddingBottom: 55, fontFamily: 'Montserrat Regular', fontSize: 15}}>Sem Imagem</Text>
              </View>
            )}
          </Item>
        </Container>
        </View>
        <Button
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
            <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 12 }}>TIRAR FOTO</Text>
          </LinearGradient>
        </Button>
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
  return bindActionCreators({ createColemia }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewColmeia);
