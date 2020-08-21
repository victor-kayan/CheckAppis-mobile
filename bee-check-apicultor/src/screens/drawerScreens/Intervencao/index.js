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
                <Icon type="EvilIcons" name="archive" style={styles.apiary} iconSize={5} active/>
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

// {/* <Content>
//           <TouchableOpacity
//             onPress={() =>
//               this.props.navigation.navigate(routes.IntervencaoApiario)
//             }
//           >
//             <Card style={{ height: 200, marginTop: 30 }}>
//               <CardItem>
//                 <View style={{ flex: 1, flexDirection: "row" }}>
//                   <Image
//                     style={{ width: 54, height: 54 }}
//                     source={images.home.apiario64}
//                   />
//                   <Text
//                     style={{
//                       marginHorizontal: 10,
//                       fontSize: 22,
//                       fontWeight: "bold"
//                     }}
//                   >
//                     Intervenções para o(s) Apiario(s)
//                   </Text>
//                 </View>
//               </CardItem>
//               <CardItem>
//                 <Body>
//                   <Text style={{ color: "#B8B8B8" }}>
//                     Listar Intervenções cadastradas para o(s) seu(s) apiario(s)
//                   </Text>
//                 </Body>
//               </CardItem>
//             </Card>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() =>
//               this.props.navigation.navigate(routes.IntervencaoColmeia)
//             }
//           >
//             <Card style={{ height: 200 }}>
//               <CardItem>
//                 <View style={{ flex: 1, flexDirection: "row" }}>
//                   <Image
//                     style={{ width: 54, height: 54 }}
//                     source={images.home.colmeia64}
//                   />
//                   <Text
//                     style={{
//                       marginHorizontal: 10,
//                       fontSize: 22,
//                       fontWeight: "bold"
//                     }}
//                   >
//                     Intervenções para as Colmeias
//                   </Text>
//                 </View>
//               </CardItem>
//               <CardItem>
//                 <Body>
//                   <Text style={{ color: "#B8B8B8" }}>
//                     Listar Intervenções cadastradas para as colmeias de seu(s)
//                     apiario(s)
//                   </Text>
//                 </Body>
//               </CardItem>
//             </Card>
//           </TouchableOpacity>
//         </Content> */}
