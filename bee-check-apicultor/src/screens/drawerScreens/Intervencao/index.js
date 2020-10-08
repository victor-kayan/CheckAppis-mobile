import React, { Component } from "react";
import { Image, TouchableOpacity, StatusBar } from "react-native";
import {
  Container,
  Content,
  Text,
  View,
  Card,
  CardItem,
  Body,
  Icon
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fecthIntervencoesByApicultor,
  concluirIntervencao
} from "../../../redux/actions/intervencaoActions";
import { HeaderCustom } from "../../../componentes";
import { images, routes, colors } from "../../../../assets";
import styles from "./styles";

class Intervencao extends Component {
  render() {
    return (
      <Container>

        <StatusBar backgroundColor={colors.theme_default} />

        <HeaderCustom
          iconLeft="menuunfold"
          typeIconLeft="AntDesign"
          handleIconLeft={() => this.props.navigation.openDrawer()}
          title="Intervenções"
          description = "Veja aqui as intervenções sugeridas para seus apiários e colmeias"
        />
        <View style = {styles.container}>
          <Text style = {styles.title}>Selecione o tipo de intervenção</Text>

          <TouchableOpacity onPress={() => this.props.navigation.navigate(routes.IntervencaoApiario)}>  
            <View style = {styles.option}>
              <View style = {styles.contentIcon}>
                <Icon type="EvilIcons" name="image" style={styles.apiary} iconSize={5} active/>
              </View>
              <View style = {styles.contentText}>
                <Text style = {styles.name}>Nos apiários</Text>
                <Text style = {styles.description} numberOfLines={2} ellipsizeMode="middle">Intervenções propostas para seus apiários</Text>
              </View>
              <View style = {styles.contentArrow}>
                <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate(routes.IntervencaoColmeia)}>  
            <View style = {styles.option}>
              <View style = {styles.contentIcon}>
                <Icon type="EvilIcons" name="archive" style={styles.apiary} iconSize={5} active/>
              </View>
              <View style = {styles.contentText}>
                <Text style = {styles.name}>Nas colmeias</Text>
                <Text style = {styles.description} numberOfLines={2} ellipsizeMode="middle">Intervenções propostas para suas colmeias</Text>
              </View>
              <View style = {styles.contentArrow}>
                <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
              </View>
            </View>
          </TouchableOpacity>

        </View>
        
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fecthIntervencoesByApicultor, concluirIntervencao },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intervencao);