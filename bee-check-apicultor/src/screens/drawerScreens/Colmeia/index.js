import React, { Component } from "react";
import { Image } from "react-native";
import {
  Left,
  Right,
  Icon,
  Card,
  CardItem,
  Container,
  Content,
  Picker,
  Text,
  Thumbnail,
  Button,
  SwipeRow,
  Row,
  View
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActionButton from "react-native-action-button";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import {
  RemoveDialog,
  HeaderCustom,
  HeaderCard,
  SpinnerCustom
} from "../../../componentes";
import {
  deleteColmeiaById,
  getColemiasByApiario
} from "../../../redux/actions/colmeiaActions";
import { colors } from "../../../../assets";
import styles from "./styles";

class Colmeia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmeia: {},
      dialogVisible: false,
      selectedPickerApiario: null
    };
  }

  componentDidMount() {
    this.fetchApiarios();
  }

  handleRefresh() {
    this.fetchApiarios();
    this.setState({ selectedPickerApiario: null });
  }

  fetchApiarios() {
    this.props.fetchApiariosByUser();
  }

  fetchColmeias(id) {
    this.props.getColemiasByApiario({ id });
  }

  deleteColmeia = () => {
    this.setState({ dialogVisible: false });
    if (this.state.colmeia) {
      const { id, apiario_id } = this.state.colmeia;
      this.setState({ dialogVisible: false });
      this.props.deleteColmeiaById({ id, apiario_id });
      // this.props.getColemiasByApiario({id: apiario_id });
    }
  };

  onValueChangePickerApiario = apiario => {
    this.setState({ selectedPickerApiario: apiario });
    if (apiario) {
      this.fetchColmeias(apiario.id);
    }
  };

  render() {
    const { selectedPickerApiario, dialogVisible } = this.state;
    const { apiarios, loading } = this.props;
    const { colmeias } = selectedPickerApiario ? this.props : [];

    return (
      <Container>
        <HeaderCustom
          iconLeft="menu"
          typeIconLeft="MaterialCommunityIcons"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Colmeias"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <SpinnerCustom visible={loading} />
        <Content padder scrollEnabled={true}>
          <Card>
            <HeaderCard style={styles.header} icon="list" title="Listagem" />
            <CardItem>
              <Image
                source={require("../../../../images/apiario.png")}
                style={styles.iconImagemSelectPicker}
              />
              <Picker
                mode="dropdown"
                selectedValue={selectedPickerApiario}
                style={styles.pikerLisitApiario}
                onValueChange={itemValue =>
                  this.onValueChangePickerApiario(itemValue)
                }
              >
                <Picker.Item
                  style={{ backgroundColor: "red" }}
                  enabled={false}
                  key={null}
                  label={"Selecione um Apiario"}
                  value={null}
                />
                {!apiarios ? (
                  <Picker.Item
                    enabled={false}
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
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Listagem de Colmeias</Text>
            </CardItem>
            {colmeias && colmeias.length > 0 ? (
              colmeias.map(colmeia => {
                return (
                  <SwipeRow
                    key={colmeia.id}
                    leftOpenValue={55}
                    rightOpenValue={-55}
                    left={
                      <Button
                        style={{ backgroundColor: colors.theme_second }}
                        onPress={() =>
                          this.props.navigation.navigate("EditColmeia", {
                            colmeia
                          })
                        }
                      >
                        <Icon
                          active
                          style={{ color: colors.theme_primary }}
                          type="FontAwesome"
                          name="edit"
                        />
                      </Button>
                    }
                    body={
                      <CardItem>
                        <Thumbnail
                          square
                          size={20}
                          style={styles.imageColmeia}
                          source={{
                            uri: colmeia.foto
                          }}
                        />
                        <View style={{ marginHorizontal: "10%" }}>
                          <Row>
                            <Text>{colmeia.nome}</Text>
                          </Row>
                          <Row>
                            <Text numberOfLines={1} note>
                              {colmeia.descricao}
                            </Text>
                          </Row>
                        </View>
                      </CardItem>
                    }
                    right={
                      <Button
                        danger
                        onPress={() =>
                          this.setState({ dialogVisible: true, colmeia })
                        }
                      >
                        <Icon active name="trash" />
                      </Button>
                    }
                  />
                );
              })
            ) : !selectedPickerApiario && !selectedPickerApiario > 0 ? (
              <CardItem>
                <Text style={{ marginStart: 10 }}>
                  Primeiro selecione um apiario
                </Text>
              </CardItem>
            ) : (
              <CardItem>
                <Left>
                  <Text>Nenhuma colmeia cadastrada</Text>
                </Left>
                <Right>
                  <Icon
                    onPress={() => this.props.navigation.navigate("NewColmeia")}
                    style={{ color: colors.theme_default }}
                    active
                    type="FontAwesome"
                    name="plus"
                  />
                </Right>
              </CardItem>
            )}
          </Card>
        </Content>
        <ActionButton buttonColor={colors.theme_primary}>
          <ActionButton.Item
            buttonColor="green"
            title="Nova colmeia"
            onPress={() => this.props.navigation.navigate("NewColmeia")}
          >
            <Icon name="plus" type="Entypo" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <RemoveDialog
          visible={dialogVisible}
          onCancel={() =>
            this.setState({ dialogVisible: false, colmeia: null })
          }
          onDelete={this.deleteColmeia}
        />
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    loading: state.apiarioState.loading || state.colmeiaState.loading,
    colmeias: state.colmeiaState.colmeias
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchApiariosByUser, deleteColmeiaById, getColemiasByApiario },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Colmeia);
