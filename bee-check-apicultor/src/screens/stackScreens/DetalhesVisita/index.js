import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import "moment/locale/pt-br";

import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Right,
  Badge,
  Left,
  Thumbnail
} from "native-base";
import { HeaderCustom, SpinnerCustom } from "../../../componentes";
import styles from "./styles";
import { colors } from "../../../../assets";

class DetalhesVisita extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  getVisitas = visita_apiario_id => {
    console.log(visita_apiario_id);
  };

  render() {
    const { visitasColmeia, loading } = this.props;

    return (
      <Container>
        <HeaderCustom title="Detalhes" />
        <Content padder>
          {visitasColmeia ? (
            visitasColmeia.map(visita => {
              return (
                <Card key={visita.id}>
                  <CardItem
                    header
                    style={{ backgroundColor: colors.theme_second }}
                  >
                    <Left>
                      <Thumbnail large source={{ uri: visita.colmeia.foto }} />
                      <Body>
                        <Text>{visita.colmeia.nome}</Text>
                        <Text note>
                          {moment(visita.data_visita).format(
                            "DD MMMM  YYYY, h:mm:ss"
                          )}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Quadros de mel</Text>
                    <Badge style={styles.badge_success}>
                      <Text style={styles.badge_text}>
                        {visita.qtd_quadros_mel}
                      </Text>
                    </Badge>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Quadros de polén</Text>
                    <Right>
                      <Badge style={styles.badge_success}>
                        <Text style={styles.badge_text}>
                          {visita.qtd_quadros_polen}
                        </Text>
                      </Badge>
                    </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Quadros de cria aberta</Text>
                    <Right>
                      <Badge style={styles.badge_success}>
                        <Text style={styles.badge_text}>
                          {visita.qtd_cria_aberta}
                        </Text>
                      </Badge>
                    </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Quadros de cria fechada</Text>
                    <Right>
                      <Badge style={styles.badge_success}>
                        <Text style={styles.badge_text}>
                          {visita.qtd_cria_fechada}
                        </Text>
                      </Badge>
                    </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Há postura </Text>
                    <Right>
                      <Badge
                        style={
                          visita.is_postura
                            ? styles.badge_success
                            : styles.badge_error
                        }
                      >
                        <Text style={styles.badge_text}>
                          {visita.is_postura ? "SIM" : "NÃO"}
                        </Text>
                      </Badge>
                    </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.text}>Há abelhas mortas </Text>
                    <Right>
                      <Badge
                        style={
                          visita.is_abelhas_mortas
                            ? styles.badge_success
                            : styles.badge_error
                        }
                      >
                        <Text style={styles.badge_text}>
                          {visita.is_abelhas_mortas ? "SIM" : "NÃO"}
                        </Text>
                      </Badge>
                    </Right>
                  </CardItem>
                </Card>
              );
            })
          ) : (
            <SpinnerCustom visible={loading} />
          )}
        </Content>
      </Container>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    loading: state.visitaColmeiaState.loading,
    visitasColmeia: state.visitaColmeiaState.visitasColmeia
  };
}

// // Doing this merges our actions into the component’s props,
// // while wrapping them in dispatch() so that they immediately dispatch an Action.
// // Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fecthVisitasColmeiaByVisita }, dispatch);
// }

export default connect(
  mapStateToProps,
  null
)(DetalhesVisita);
