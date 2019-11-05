import React, { Component } from "react";
import { View, CardItem, Left, Text, Right, Textarea } from "native-base";
import { InputNumeric, InputSwitch, ButtonCustom } from "../../../componentes";
import styles from "./styles";

class FormVisita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtd_quadros_mel: 0,
      qtd_quadros_polen: 0,
      qtd_quadros_vazios: 0,
      tem_abelhas_mortas: 1,
      qtd_cria_aberta: 0,
      qtd_cria_fechada: 0,
      tem_postura: 1,
      visita_apiario_id: 0,
      observacao: ""
    };
  }

  handleAddVisita = () => {
    let tem_abelhas_mortas = this.state.tem_abelhas_mortas == 1 ? 0 : 1;
    let tem_postura = this.state.tem_postura == 1 ? 0 : 1;

    const {
      qtd_quadros_mel,
      qtd_quadros_polen,
      qtd_quadros_vazios,
      qtd_cria_aberta,
      qtd_cria_fechada,
      observacao
    } = this.state;

    let values = {
      tem_abelhas_mortas,
      tem_postura,
      qtd_quadros_mel,
      qtd_quadros_polen,
      qtd_quadros_vazios,
      qtd_cria_aberta,
      qtd_cria_fechada,
      observacao
    };

    this.props.handleAddVisitaColmeia(values);
    this.clearState();
  };

  clearState = () => {
    this.setState({
      qtd_quadros_mel: 0,
      qtd_quadros_polen: 0,
      qtd_quadros_vazios: 0,
      tem_abelhas_mortas: 1,
      qtd_cria_aberta: 0,
      qtd_cria_fechada: 0,
      tem_postura: 1,
      visita_apiario_id: 0,
      observacao: ""
    });
  };

  onValueChangeselectedPickerColmeia = colmeia => {
    this.setState({ colmeia });
  };

  render() {
    const {
      qtd_quadros_mel,
      qtd_quadros_polen,
      qtd_quadros_vazios,
      tem_abelhas_mortas,
      qtd_cria_aberta,
      qtd_cria_fechada,
      tem_postura,
      observacao
    } = this.state;
    return (
      <View>
        <CardItem>
          <Left>
            <Text>Há quantos quadros de Mel?</Text>
          </Left>
          <Right>
            <InputNumeric
              value={qtd_quadros_mel}
              onChangePlus={() =>
                this.setState({ qtd_quadros_mel: qtd_quadros_mel + 1 })
              } // this is necessary for this component
              onChangeMinus={() =>
                this.setState({
                  qtd_quadros_mel:
                    qtd_quadros_mel <= 0 ? qtd_quadros_mel : qtd_quadros_mel - 1
                })
              }
            />
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Há quantos quadros de Pólen?</Text>
          </Left>
          <Right>
            <InputNumeric
              value={qtd_quadros_polen}
              onChangePlus={() =>
                this.setState({
                  qtd_quadros_polen: qtd_quadros_polen + 1
                })
              } // this is necessary for this component
              onChangeMinus={() =>
                this.setState({
                  qtd_quadros_polen:
                    qtd_quadros_polen <= 0
                      ? qtd_quadros_polen
                      : qtd_quadros_polen - 1
                })
              }
            />
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Há quantos quadros de cria Aberta?</Text>
          </Left>
          <Right>
            <InputNumeric
              value={qtd_cria_aberta}
              onChangePlus={() =>
                this.setState({ qtd_cria_aberta: qtd_cria_aberta + 1 })
              } // this is necessary for this component
              onChangeMinus={() =>
                this.setState({
                  qtd_cria_aberta:
                    qtd_cria_aberta <= 0 ? qtd_cria_aberta : qtd_cria_aberta - 1
                })
              }
            />
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Há quantos quadros de cria Fechada?</Text>
          </Left>
          <Right>
            <InputNumeric
              value={qtd_cria_fechada}
              onChangePlus={() =>
                this.setState({
                  qtd_cria_fechada: qtd_cria_fechada + 1
                })
              } // this is necessary for this component
              onChangeMinus={() =>
                this.setState({
                  qtd_cria_fechada:
                    qtd_cria_fechada <= 0
                      ? qtd_cria_fechada
                      : qtd_cria_fechada - 1
                })
              }
            />
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Há quantos quadros vazios?</Text>
          </Left>
          <Right>
            <InputNumeric
              value={qtd_quadros_vazios}
              onChangePlus={() =>
                this.setState({
                  qtd_quadros_vazios: qtd_quadros_vazios + 1
                })
              } // this is necessary for this component
              onChangeMinus={() =>
                this.setState({
                  qtd_quadros_vazios:
                  qtd_quadros_vazios <= 0
                      ? qtd_quadros_vazios
                      : qtd_quadros_vazios - 1
                })
              }
            />
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Há abelhas mortas no Alavo?</Text>
          </Left>
          <Right>
            <InputSwitch
              value={tem_abelhas_mortas}
              onValueChange={tem_abelhas_mortas =>
                this.setState({ tem_abelhas_mortas })
              } // this is necessary for this component
            />
          </Right>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Há presença de Postura?</Text>
          </Left>
          <Right>
            <InputSwitch
              value={tem_postura}
              onValueChange={tem_postura => this.setState({ tem_postura })} // this is necessary for this component
            />
          </Right>
        </CardItem>
        <CardItem>
          <Textarea
            rowSpan={4}
            value={observacao}
            onChangeText={observacao => this.setState({ observacao })}
            style={{ width: "100%", borderRadius: 5 }}
            bordered
            placeholder="Observações"
          />
        </CardItem>
        <CardItem style={{ alignSelf: "flex-end" }}>
          <ButtonCustom
            style={styles.buttonSalveVisita}
            onPress={this.handleAddVisita}
            title="Proxima Colmeia"
            iconRight="arrowright"
            typeIconRight="AntDesign"
          />
        </CardItem>
      </View>
    );
  }
}

export default FormVisita;
