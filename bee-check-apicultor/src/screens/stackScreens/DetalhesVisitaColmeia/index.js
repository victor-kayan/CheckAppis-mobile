import React from "react";
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
import { HeaderCustom } from "../../../componentes";
import styles from "./styles";
import { colors } from "../../../../assets";

class DetalhesVisita extends React.Component {
  render() {
    const visitasColmeia = this.props.navigation.getParam("visitasColmeia", "");

    console.log(visitasColmeia);
    

    return (
      <Container>
        <HeaderCustom title="Detalhes" />
        <Content padder>
          {visitasColmeia &&
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
            })}
        </Content>
      </Container>
    );
  }
}

export default DetalhesVisita;
