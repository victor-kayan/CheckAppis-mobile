import React, { Component } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import {
  Container,
  Content,
  Left,
  Header,
  Picker,
  Right,
  Card,
  CardItem,
  Body,
  Button,
  Text,
  Title,
  Input,
  Icon,
  Item,
  DatePicker
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createColemia } from "../../../redux/actions/colmeiaActions";
import ImagePicker from "react-native-image-picker";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import { colors } from "../../../../assets";
import styles from "./styles";
import {
  HeaderCustom,
  ButtonCustom,
  HeaderCard,
  SpinnerCustom
} from "../../../componentes";

const options = {
  title: "Imagem da colmeia",
  takePhotoButtonTitle: "Tirar uma nova foto",
  chooseFromLibraryButtonTitle: "Selecionar foto na galeria",
  quality: 0.5
};

class NewColmeia extends Component {
  state = {
    selectedPickerApiario: [],
    colmeia: {
      apiario: [],
      descricao: "",
      nome: ""
    },
    foto: {},
    foto_uri: null
  };

  handleRefresh = () => {
    this.fetchApiarios();
  };

  fetchApiarios() {
    this.props.fetchApiariosByUser();
  }

  onAddColmeia = () => {
    const { colmeia, foto } = this.state;
    const { createColemia, fetchApiariosByUser } = this.props;

    if (
      colmeia.nome == "" ||
      colmeia.descricao == "" ||
      colmeia.apiario == null
    ) {
      Alert.alert("Erro de validação", "Preencha todos os campos");
    } else {
      createColemia({
        descricao: colmeia.descricao,
        nome: colmeia.nome,
        foto,
        apiario_id: colmeia.apiario.id
      });
      fetchApiariosByUser();
      this.clearInputs();
    }
  };

  clearInputs = () => {
    this.setState({ foto: {}, foto_uri: null });
    this.setState({ colmeia: { apiario: [], descricao: "", nome: "" } });
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
    const { apiarios, loading } = this.props;
    const { colmeia, foto_uri } = this.state;
    // console.log(this.props.navigation.isFocused());
    return (
      <Container>
        <HeaderCustom
          title="Colmeias"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <Content padder>
          <SpinnerCustom visible={loading} />
          <Card>
            <HeaderCard
              style={styles.header}
              icon="plus"
              typeIcon="FontAwesome"
              title="Cadastro"
            />
            <CardItem>
              <Body>
                <Item picker>
                  <Image
                    source={require("../../../../images/apiario.png")}
                    style={styles.iconImagemSelectPicker}
                  />
                  <Picker
                    mode="dropdown"
                    selectedValue={colmeia.apiario}
                    style={{ height: 40, width: "90%" }}
                    onValueChange={itemValue =>
                      this.setState({
                        colmeia: { ...colmeia, apiario: itemValue }
                      })
                    }
                  >
                    <Picker.Item
                      key={null}
                      label={"Selecione um Apiario"}
                      value={null}
                    />
                    {!apiarios ? (
                      <Picker.Item
                        disabled
                        note
                        label={"Nenhum Apiario encontrado"}
                      />
                    ) : (
                      apiarios.map(data => {
                        return (
                          <Picker.Item
                            key={data.id}
                            label={data.nome}
                            value={data}
                          />
                        );
                      })
                    )}
                  </Picker>
                </Item>
                <Item style={{ marginTop: 20 }}>
                  <Icon active type="AntDesign" name="idcard" />
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
                <Item style={{ marginTop: 20 }}>
                  <Icon active type="FontAwesome" name="pencil" />
                  <Input
                    value={colmeia.descricao}
                    placeholder="descrição da colmeia"
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
                  style={{
                    backgroundColor: colors.theme_second,
                    marginTop: 20
                  }}
                >
                  <Text style={{ color: colors.black }}>Tirar Foto</Text>
                  <Icon
                    type="EvilIcons"
                    name="camera"
                    style={{
                      color: colors.theme_default,
                      fontSize: 24,
                      marginLeft: 15
                    }}
                  />
                </Button>
                <Item
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <Image
                    style={styles.imageFormColmeia}
                    source={
                      foto_uri != null
                        ? foto_uri
                        : require("../../../../images/sem-foto.jpg")
                    }
                  />
                </Item>
                <ButtonCustom
                  onPress={() => this.onAddColmeia()}
                  iconLeft="save"
                  typeIconLeft="FontAwesome"
                  title="Salvar Colmeia"
                  style={{
                    alignSelf: "flex-end",
                    marginEnd: 10,
                    marginTop: 20
                  }}
                />
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    loading: state.apiarioState.loading || state.colmeiaState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchApiariosByUser, createColemia }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewColmeia);
