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
} from "native-base";
import { Image, Alert, View} from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editColmeia } from "../../../redux/actions/colmeiaActions";
import { colors } from "../../../../assets";
import styles from "./styles";
import {
  ButtonCustom,
  SpinnerCustom
} from "../../../componentes";
import LinearGradient from "react-native-linear-gradient";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";


const options = {
  title: "Imagem da colmeia",
  takePhotoButtonTitle: "Tirar uma nova foto",
  chooseFromLibraryButtonTitle: "Selecionar foto na galeria",
  quality: 0.5
};

class EditColmeia extends Component {

  componentDidMount() {
    this.setState({ colmeia: this.props.navigation.getParam("hive", "") });
  }

  state = {
    colmeia: {},
    foto: null,
    foto_uri: null
  };

  onEditColmeia = () => {
    const { id, descricao, nome, apiario_id } = this.state.colmeia;
    const { foto } = this.state;

    if (nome == "" || descricao == "") {
      Alert.alert("Erro de validação", "Preencha todos os campos");
    } else {
      this.props.editColmeia({ id, descricao, nome, apiario_id, foto });
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
      <View style = {{flex: 1, width: '100%', height: '100%', backgroundColor: 'white'}}>
      <Container style = {{position: 'absolute', alignSelf: 'center', flex: 1, width: '100%'}}>
        <HeaderCustomStack 
          title="Edição"
          description="Altere as informações dessa colmeia inserindo novos dados"
        />
        <Content padder>
        <SpinnerCustom visible={loading} />
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
                  onPress={() => this.onEditColmeia()}
                  iconRight="check"
                  typeIconRight="AntDesign"
                  title="SALVAR ALTERAÇÕES"
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
              <Image
                style={styles.imageFormColmeia}
                source={{
                  uri: colmeia.foto
                }}
              />
            )}
          </Item>
      </Container>

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
        <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 12 }}>ALTERAR IMAGEM</Text>
      </LinearGradient>
      </Button>
      </View>
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


// {/* <Container>
//         <HeaderCustom title="Edição" />
//         <Content padder>
//           <SpinnerCustom visible={loading} />
//           <CardItem>
//             <Body>
//               <Item>
//                 <Icon
//                   style={{
//                     color: colors.colorIcons
//                   }}
//                   active
//                   type="AntDesign"
//                   name="idcard"
//                 />
//                 {/* <Label>Nome(Indentificador) da colmeia</Label> */}
//                 <Input
//                   value={colmeia.nome}
//                   placeholder="Nome(Indentificador) da colmeia"
//                   onChangeText={nome =>
//                     this.setState({
//                       colmeia: { ...colmeia, nome }
//                     })
//                   }
//                 />
//               </Item>
//               <Item>
//                 <Icon
//                   active
//                   style={{
//                     color: colors.colorIcons
//                   }}
//                   type="FontAwesome"
//                   name="pencil"
//                 />
//                 {/* <Label>Descrição da colmeia</Label> */}
//                 <Input
//                   placeholder="Descrição da colmeia"
//                   value={colmeia.descricao}
//                   onChangeText={descricao =>
//                     this.setState({
//                       colmeia: { ...colmeia, descricao }
//                     })
//                   }
//                 />
//               </Item>
//               <Button
//                 iconRight
//                 full
//                 rounded
//                 onPress={this.slectPhoto.bind(this)}
//                 style={styles.buttonSelectFoto}
//               >
//                 <Text style={{ color: colors.black }}>Editar Foto</Text>
//                 <Icon
//                   type="EvilIcons"
//                   name="camera"
//                   style={styles.iconButtonSelectFoto}
//                 />
//               </Button>
//               <Item style={styles.itemFotoColmeia}>
//                 {foto_uri ? (
//                   <Image style={styles.imageFormColmeia} source={foto_uri} />
//                 ) : (
//                   <Image
//                     style={styles.imageFormColmeia}
//                     source={{
//                       uri: colmeia.foto
//                     }}
//                   />
//                 )}
//               </Item>
//               <ButtonCustom
//                 style={styles.buttonSalveEditcao}
//                 title="Salvar Edição"
//                 iconLeft="save"
//                 typeIconLeft="FontAwesome"
//                 onPress={() => this.onEditColmeia()}
//               />
//             </Body>
//           </CardItem>
//         </Content>
//       </Container> */}