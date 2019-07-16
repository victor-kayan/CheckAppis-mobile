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
  SpinnerCustom
} from "../../../componentes";
import {
  deleteColmeiaById,
  getColemiasByApiario
} from "../../../redux/actions/colmeiaActions";
import { colors, routes, images } from "../../../../assets";
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
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Colmeias"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <SpinnerCustom visible={loading} />
        <Content padder scrollEnabled={true}>
          <Card>
            <CardItem>
              <Image
                source={images.icons.apiario}
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
          {!loading && colmeias && colmeias.length > 0 ? (
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
                        this.props.navigation.navigate(routes.EditColmeia, {
                          colmeia
                        })
                      }
                    >
                      <Icon
                        active
                        style={{ color: colors.colorIcons }}
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
          ) : !loading &&
            !selectedPickerApiario &&
            !selectedPickerApiario > 0 ? (
            <>
              <CardItem
                style={{
                  marginTop: 20,
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Text>Primeiro selecione um apiario</Text>
              </CardItem>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image style={{marginTop: '15%'}} source={images.home.apiario} />
              </View>
            </>
          ) : (
            !loading && (
              <>
                <CardItem
                  style={{
                    marginTop: 20,
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Text>Nenhuma colmeia cadastrada</Text>
                </CardItem>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    onPress={() =>
                      this.props.navigation.navigate(routes.NewColmeia, {
                        apiario_id: selectedPickerApiario.id
                      })
                    }
                    style={{ color: colors.btn_success, marginLeft: '30%',marginTop: '15%' }}
                    active
                    type="AntDesign"
                    name="pluscircle"
                  />
                  <Image source={images.home.colmeia} />
                </View>
              </>
            )
          )}
        </Content>
        {selectedPickerApiario && (
          <ActionButton buttonColor={colors.btn_success}>
            <ActionButton.Item
              buttonColor={"#ffc60b"}
              title="Nova colmeia"
              onPress={() =>
                this.props.navigation.navigate(routes.NewColmeia, {
                  apiario_id: selectedPickerApiario.id
                })
              }
            >
              <Icon name="plus" type="Entypo" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        )}
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
