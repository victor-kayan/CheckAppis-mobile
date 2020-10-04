import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Container, View, Text, Icon } from "native-base";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/pt-br";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import styles from "./styles";

class DetailsInterventionHive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concluindoIntervencao: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.concluindoIntervencao &&
      nextProps.concluirIntervencaoSuccess
    ) {
      const route = this.props.navigation.getParam(
        "routeOnSuccessConcluir",
        ""
      );

      this.setState({ concluindoIntervencao: false });
      this.props.navigation.navigate(route);
    }
  }

  render() {
    const intervencao = this.props.navigation.getParam("intervencao", "");
    const onConcluirIntervencao = this.props.navigation.getParam("onConcluirIntervencao", "");

    return (
      <Container>
        <HeaderCustomStack 
          title="Detalhes"
          description = "Veja todos os detalhes da intervenção selecionada anteriormente" 
        />
        
        <View style = {styles.container}>
          <View style = {styles.viewInformations}>
            <Text style = {styles.informations}>Informações</Text>
          </View>

          <View style = {styles.containerContent}>
            <ScrollView contentContainerStyle={{width: '100%'}} showsVerticalScrollIndicator = {false}>

              <View style = {styles.cardInformation}>
                <Icon type="AntDesign" name="calendar" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Data de realização</Text>
                  <Text style = {styles.description}>{moment(intervencao.created_at).format("DD")} de {moment(intervencao.created_at).format("MMMM")} de {moment(intervencao.created_at).format("YYYY")}</Text>
                </View>
              </View>

              <View style = {styles.cardInformation}>
                <Icon type="AntDesign" name="user" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Técnico responsável</Text>
                  <Text style = {styles.description}>{intervencao.tecnico.name}</Text>
                </View>
              </View>

              <View style = {styles.cardInformation}>
                <Icon type="AntDesign" name="clockcircleo" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Prazo para aplicação</Text>
                  <Text style = {styles.description}>
                    {moment(intervencao.data_inicio).format("DD")} de {moment(intervencao.data_inicio).format("MMMM")} de {moment(intervencao.data_inicio).format("YYYY")}
                    {` a\n`} 
                    {moment(intervencao.data_fim).format("DD")} de {moment(intervencao.data_fim).format("MMMM")} de {moment(intervencao.data_fim).format("YYYY")}
                  </Text>
                </View>
              </View>

              <View style = {styles.cardInformation}>
                <Icon type="MaterialIcons" name="view-headline" style={styles.icons}/>
                <View>
                  <Text style = {styles.title}>Prescrição</Text>
                  <Text style = {styles.description}>{intervencao.descricao}</Text>
                </View>
              </View>

              <TouchableOpacity onPress = {() => {onConcluirIntervencao(intervencao); this.setState({ concluindoIntervencao: true });}} style = {styles.button}>
                <Text style = {styles.textButton}>Marcar como concluída</Text>
                <Icon type="AntDesign" name="check" style={styles.iconsCheck}/>
              </TouchableOpacity>

              <View style = {{height: 70}}/>

            </ScrollView>
          </View>

        </View>
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    concluirIntervencaoSuccess:
      state.intervencaoState.concluirIntervencaoSuccess
  };
}

export default connect(
  mapStateToProps,
  null
)(DetailsInterventionHive);


