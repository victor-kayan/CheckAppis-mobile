import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActionButton from "react-native-action-button";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import {
  getVisitasByApiario,
  deleteVisita
} from "../../../redux/actions/visitaActions";

import {
  Text,
  Left,
  Button,
  Icon,
  Right,
  Container,
  Content,
  Card,
  CardItem,
  Picker,
  SwipeRow,
  View,
  Row,
  Badge
} from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { colors, routes, images } from "../../../../assets";
import styles from "./styles";
import {
  HeaderCustom,
  SpinnerCustom,
  RemoveDialog
} from "../../../componentes";
import moment from "moment";
import "moment/locale/pt-br";

class Visita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visita: {},
      dialogVisible: false,
      selectedPickerApiario: null
    };
  }

  componentDidMount() {
    this.handleRefresh();    
  }

  handleRefresh = () => {
    this.props.fetchApiariosByUser();
  };

  onValueChangePickerApiario = apiario => {
    this.setState({ selectedPickerApiario: apiario });
    if (apiario) {
      this.fecthVisita(apiario.id);
    }
  };

  fecthVisita = id => {
    this.props.getVisitasByApiario({ apiario_id: id });
  };

  handleDelete = () => {
    this.setState({ dialogVisible: false });
    this.props.deleteVisita({
      visita_id: this.state.visita.id,
      apiario_id: this.state.selectedPickerApiario.id
    });
  };

  handleDetalhar = visita => {
    
    this.props.navigation.navigate(routes.DetalhesVisita, {
      visita, apiario: this.state.selectedPickerApiario
    });
  };

  render() {
    const { selectedPickerApiario, dialogVisible } = this.state;
    const { apiarios, loading } = this.props;
    const { visitas } = selectedPickerApiario == null ? [] : this.props;

    return (
      <Container>
        <HeaderCustom
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Visitas"
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
          {!loading && visitas && visitas.length > 0 ? (
            visitas.map(visita => {
              return (
                <SwipeRow
                  key={visita.id}
                  rightOpenValue={-55}
                  body={
                    <CardItem>
                      <TouchableOpacity
                        onPress={() => this.handleDetalhar(visita)}
                      >
                        <View style={{ marginHorizontal: "10%" }}>
                          <Row>
                            <Text>
                              {`Data: ${moment(visita.created_at).format(
                                "DD MMMM  YYYY"
                              )}`}
                            </Text>
                          </Row>
                          <Row style={{ marginTop: 5 }}>
                            <Left>
                              <Text note>colmeias visitadas</Text>
                            </Left>
                            <Badge
                              style={{
                                backgroundColor: colors.theme_second,
                                marginEnd: 5
                              }}
                            >
                              <Text note>{visita.visita_colmeias && visita.visita_colmeias.length}</Text>
                            </Badge>
                          </Row>
                        </View>
                      </TouchableOpacity>
                      <Right>
                        <Button
                          transparent
                          onPress={() => this.handleDetalhar(visita)}
                        >
                          <Icon
                            active
                            style={{ color: colors.colorIcons }}
                            name="magnifying-glass"
                            type="Entypo"
                          />
                        </Button>
                      </Right>
                    </CardItem>
                  }
                  right={
                    <Button
                      danger
                      onPress={() =>
                        this.setState({ dialogVisible: true, visita })
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
                  <Text>Nenhuma visita cadastrada</Text>
                </CardItem>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    onPress={() =>
                      this.props.navigation.navigate(routes.NewVisitaApiario, {
                        apiario_id: selectedPickerApiario.id
                      })
                    }
                    style={{ color: colors.btn_success, marginLeft: '30%', marginTop: '15%' }}
                    active
                    type="AntDesign"
                    name="pluscircle"
                  />
                  <Image source={images.home.visita} />
                </View>
              </>
            )
          )}
        </Content>
        <ActionButton buttonColor={colors.btn_success}>
          <ActionButton.Item
            buttonColor={colors.theme_primary}
            title="Nova Visita"
            onPress={() => this.props.navigation.navigate(routes.NewVisitaApiario)}
          >
            <Icon name="plus" type="Entypo" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <RemoveDialog
          visible={dialogVisible}
          onCancel={() =>
            this.setState({ dialogVisible: false, colmeia: null })
          }
          onDelete={this.handleDelete}
        />
      </Container>
    );
  }
}

// export default Visita;
function mapStateToProps(state, props) {
  return {
    apiarios: state.apiarioState.apiarios,
    visitas: state.visitaState.visitas,
    loading: state.apiarioState.loading || state.visitaState.visitaIsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchApiariosByUser,
      getVisitasByApiario,
      deleteVisita
      // fecthVisitasColmeiaByVisita
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visita);
