import React, { Component } from "react";
import {
  Card,
  CardItem,
  Container,
  Content,
  Text,
  Left,
  Thumbnail,
  Body,
  Icon,
  Button,
  Right
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fecthIntervencoesColmeiasByIntervencao, concluirIntervencaoColmeia } from '../../../redux/actions/intervencaoColmeiaActions';
import {
  HeaderCustom,
  SpinnerCustom,
  ButtonCustom
} from "../../../componentes";
import moment from "moment";
import "moment/locale/pt-br";
import styles from "./styles";

class IntervencaoColmeia extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh() {
    let intervencao_id = this.props.navigation.getParam("intervencao_id", "")
    this.props.fecthIntervencoesColmeiasByIntervencao({intervencao_id});
  }

  handleConcluir(intervencao_colmeia_id) {
    let intervencao_id = this.props.navigation.getParam("intervencao_id", "");
    this.props.concluirIntervencaoColmeia({intervencao_colmeia_id, intervencao_id});
  }

  render() {
    const { intervencoes, loading } = this.props;

    return (
      <Container>
        <HeaderCustom
          title="Intervenções"
          iconRight="sync"
          handleIconRight={() => this.handleRefresh()}
          typeIconRight="AntDesign"
        />
        <SpinnerCustom visible={loading} />
        <Content padder scrollEnabled={true}>
          <Card transparent>
            <CardItem header>
              <Text>Listagem de Intervenções</Text>
            </CardItem>
            {intervencoes && intervencoes.length > 0 ? (
              intervencoes.map(intervencao => {
                return (
                  <Card key={intervencao.id} style={{ flex: 0 }}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{ uri: intervencao.colmeia && intervencao.colmeia.foto }} />
                        <Body>
                          <Text>{intervencao.colmeia && intervencao.colmeia.nome}</Text>
                          <Text note>
                            {moment(intervencao.colmeia && intervencao.created_at).fromNow()}
                          </Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>{intervencao.descricao}</Text>
                      </Body>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button transparent textStyle={{ color: "#2EC72E" }}>
                          <Icon name="clock" style={{ color: "#2EC72E" }} />
                          <Text style={{ color: "#2EC72E", fontSize: 10 }}>
                            Inicio:{" "}
                            {moment(intervencao.data_inicio).format(
                              "DD MMMM  YYYY"
                            )}
                          </Text>
                        </Button>
                      </Left>
                      <Right>
                        <Button transparent textStyle={{ color: "#FB0505" }}>
                          <Icon name="clock" style={{ color: "#FB0505" }} />
                          <Text style={{ color: "#FB0505", fontSize: 10 }}>
                            Fim:{" "}
                            {moment(intervencao.data_fim).format(
                              "DD MMMM  YYYY"
                            )}
                          </Text>
                        </Button>
                      </Right>
                    </CardItem>
                    <ButtonCustom
                      small
                      iconRight
                      style={styles.buttonPorColmeia}
                      title="Concluir"
                      iconRight="check"
                      typeIconRight="AntDesign"
                      onPress={() => this.handleConcluir(intervencao.id)}
                    />
                  </Card>
                );
              })
            ) : (
              <CardItem>
                <Text>Nenhuma Intervenção cadastrada para as colmeias</Text>
              </CardItem>
            )}
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loading: state.intervencaoColmeiaState.loading,
    intervencoes: state.intervencaoColmeiaState.intervencoes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fecthIntervencoesColmeiasByIntervencao, concluirIntervencaoColmeia },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervencaoColmeia);
