import React, { Component } from "react";
import { View, CardItem, Left, Text, Right, Textarea, Body, Icon } from "native-base";
import { InputSwitch, ButtonCustom } from "../../../componentes";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import { colors } from "../../../../assets";


class FormVisita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tem_agua: 1,
      tem_sombra: 1,
      tem_comida: 1,
      observacao: ""
    };
  }

  handleAddVisita = () => {
    let tem_agua = this.state.tem_agua == 1 ? 0 : 1;
    let tem_sombra = this.state.tem_sombra == 1 ? 0 : 1;
    let tem_comida = this.state.tem_comida == 1 ? 0 : 1;

    let values = {
      tem_agua,
      tem_sombra,
      tem_comida,
      observacao: this.state.observacao
    };

    this.props.handleAddVisitaApiario(values);
  };

  render() {
    const { tem_agua, tem_sombra, tem_comida, observacao } = this.state;

    return (
      <View>
        
        <CardItem>
          <Left>
            <Text style = {styles.textForm}>Há água?</Text>
          </Left>
          <Body />
          <Right>
            <InputSwitch
              value={tem_agua}
              onValueChange={tem_agua => this.setState({ tem_agua })} // this is necessary for this component
            />
          </Right>
        </CardItem>

        <CardItem>
          <Left>
            <Text style = {styles.textForm}>Está sombreado?</Text>
          </Left>
          <Body />
          <Right>
            <InputSwitch
              value={tem_sombra}
              onValueChange={tem_sombra => this.setState({ tem_sombra })} // this is necessary for this component
            />
          </Right>
        </CardItem>

        <CardItem>
          <Left>
            <Text style = {styles.textForm}>Há comida?</Text>
          </Left>
          <Body />
          <Right>
            <InputSwitch
              value={tem_comida}
              onValueChange={tem_comida => this.setState({ tem_comida })} // this is necessary for this component
            />
          </Right>
        </CardItem>

        <CardItem>
          <Textarea
            rowSpan={4}
            value={observacao}
            onChangeText={observacao => this.setState({ observacao })}
            style={{ width: "100%", borderRadius: 10, fontFamily: 'Montserrat-Regular', fontSize: 13, }}
            bordered
            placeholder="Observações"
          />
        </CardItem>

        <View style = {styles.visitButton}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="#ff8500"
            onPress={() => this.handleAddVisita()}
            style = {{borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
          >
            <LinearGradient
              colors={[colors.theme_default, colors.theme_second]}
              style={{ height: '100%', borderRadius: 30}}
            >
              <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 13, letterSpacing: 1, marginHorizontal: 30, marginTop: 15}}>VISITAR COLMEIAS</Text>
            </LinearGradient>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}
export default FormVisita;
