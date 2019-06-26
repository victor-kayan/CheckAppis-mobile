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
  Text
} from "native-base";
import { Image, Alert } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { editColmeia } from "../../../redux/actions/colmeiaActions";
import { colors } from "../../../../assets";
import styles from "./styles";
import {
  HeaderCustom,
  ButtonCustom,
  SpinnerCustom
} from "../../../componentes";

const options = {
  title: "Imagem da colmeia",
  takePhotoButtonTitle: "Tirar uma nova foto",
  chooseFromLibraryButtonTitle: "Selecionar foto na galeria",
  quality: 0.5
};

class EditColmeia extends Component {
  componentDidMount() {
    this.setState({ colmeia: this.props.navigation.getParam("colmeia", "") });
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
        // console.log("User cancelled image picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({ foto: response, foto_uri: source });
      }
    });
  };

  render() {
    const { colmeia, foto, foto_uri } = this.state;
    const { loading } = this.props;

    // console.log(colmeia);
    return (
      <Container>
        <HeaderCustom title="Edição" />
        <Content padder>
          <SpinnerCustom visible={loading} />
          <CardItem>
            <Body>
              <Item>
                <Icon active type="AntDesign" name="idcard" />
                {/* <Label>Nome(Indentificador) da colmeia</Label> */}
                <Input
                  value={colmeia.nome}
                  placeholder="Nome(Indentificador) da colmeia"
                  onChangeText={nome =>
                    this.setState({
                      colmeia: { ...colmeia, nome }
                    })
                  }
                />
              </Item>
              <Item>
                <Icon active type="FontAwesome" name="pencil" />
                {/* <Label>Descrição da colmeia</Label> */}
                <Input
                  placeholder="Descrição da colmeia"
                  value={colmeia.descricao}
                  onChangeText={descricao =>
                    this.setState({
                      colmeia: { ...colmeia, descricao }
                    })
                  }
                />
              </Item>
              <Button
                iconRight
                full
                rounded
                onPress={this.slectPhoto.bind(this)}
                style={styles.buttonSelectFoto}
              >
                <Text style={{ color: colors.black }}>Editar Foto</Text>
                <Icon
                  type="EvilIcons"
                  name="camera"
                  style={styles.iconButtonSelectFoto}
                />
              </Button>
              <Item style={styles.itemFotoColmeia}>
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
              <ButtonCustom
                style={styles.buttonSalveEditcao}
                title="Salvar Edição"
                iconLeft="save"
                typeIconLeft="FontAwesome"
                onPress={() => this.onEditColmeia()}
              />
            </Body>
          </CardItem>
        </Content>
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
