import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActionButton from "react-native-action-button";
import { fetchApiariosByUser } from "../../../redux/actions/apiarioActions";
import {
  fecthVisitaApiarioByApiario,
  deleteVisitaApiario
} from "../../../redux/actions/visitaApiarioActions";
import { fecthVisitasColmeiaByVisitaApiario } from "../../../redux/actions/visitaColmeiaActions";

const imageApiario128 = require("../../../../images/icons/apiario128.png");
const imageVisita128 = require("../../../../images/icons/visita128.png");

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
import { colors } from "../../../../assets";
import styles from "./styles";
import {
  HeaderCustom,
  HeaderCard,
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
      this.fecthVisitaApiario(apiario.id);
    }
  };

  fecthVisitaApiario = id => {
    this.props.fecthVisitaApiarioByApiario({ apiario_id: id });
  };

  handleDelete = () => {
    this.setState({ dialogVisible: false });
    this.props.deleteVisitaApiario({
      visita_id: this.state.visita.id,
      apiario_id: this.state.selectedPickerApiario.id
    });
  };

  handleDetalhar = visita => {
    this.props.fecthVisitasColmeiaByVisitaApiario({
      visita_apiario_id: visita.id
    });
    this.props.navigation.navigate("DetalhesVisita");
  };

  render() {
    const { selectedPickerApiario, dialogVisible } = this.state;
    const { apiarios, loading } = this.props;
    const { visitasApiario } = selectedPickerApiario == null ? [] : this.props;

    return (
      <Container>
        <HeaderCustom
          iconLeft="menu"
          typeIconLeft="MaterialCommunityIcons"
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
                source={require("../../../../images/icons/apiario128.png")}
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
          {!loading && visitasApiario && visitasApiario.length > 0 ? (
            visitasApiario.map(visita => {
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
                              {`Data: ${moment(visita.data_visita).format(
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
                              <Text note>{visita.qtd_colmeias_visitadas}</Text>
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
                            style={{ color: colors.theme_primary }}
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
            <View
              style={{
                marginTop: 50,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image source={imageApiario128} />
              <Text style={{ margin: 20, color: "#444444" }}>
                Primeiro selecione um apiario
              </Text>
            </View>
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
                      this.props.navigation.navigate("NewVisitaApiario", {
                        apiario_id: selectedPickerApiario.id
                      })
                    }
                    style={{ color: colors.btn_success, marginLeft: 130 }}
                    active
                    type="AntDesign"
                    name="pluscircle"
                  />
                  <Image source={imageVisita128} />
                </View>
              </>
            )
          )}
        </Content>
        <ActionButton buttonColor={colors.btn_success}>
          <ActionButton.Item
            buttonColor={colors.theme_primary}
            title="Nova Visita"
            onPress={() => this.props.navigation.navigate("NewVisitaApiario")}
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
    visitasApiario: state.visitaApiarioState.visitasApiario,
    loading: state.apiarioState.loading || state.visitaApiarioState.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchApiariosByUser,
      fecthVisitaApiarioByApiario,
      deleteVisitaApiario,
      fecthVisitasColmeiaByVisitaApiario
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visita);
