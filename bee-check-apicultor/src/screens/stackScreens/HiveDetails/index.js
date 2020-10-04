import React from "react";
import { TouchableOpacity, ScrollView, Alert, TouchableHighlight, Image } from "react-native";
import { Container, View, Text, Icon, Item } from "native-base";
import { colors, routes } from "../../../../assets";
import styles from "./styles";
import moment from "moment";
import "moment/locale/pt-br";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import LinearGradient from "react-native-linear-gradient";
import { deleteColmeiaById, getColmeiasByApiario } from "../../../redux/actions/colmeiaActions";
import { SpinnerCustom } from "../../../componentes";

class HiveDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hive: this.props.navigation.getParam("hive", ""),
      apiary: this.props.navigation.getParam("apiary", ""),
    };
  }

  // mostrar status de sincronização
  showStatus = () => {
    {
      this.state.visit.isSynced ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'Sua visita foi sincronizada com sucesso.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : this.state.visit.permanentlyFailed ? 
      (
        Alert.alert(
          'Status de Sincronização',
          'A sincronização da visita falhou permanentemente. Por favor, delete a visita ou realize uma nova.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
      : 
      (
        Alert.alert(
          'Status de Sincronização',
          'Aguardando conexão com a internet para sincronizar a visita.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'OK', 
              style: 'ok',
            },
          ],
          {cancelable: false},
        )
      )
    }
  };

  openEditHive = hive => {
    this.props.navigation.navigate(routes.EditColmeia, {hive});
  };

  // deletar colmeia
  deleteHive = hiveId => {
    Alert.alert(
      'Excluir Colmeia',
      'Tem certeza que deseja exlcuir essa Colmeia?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          if (this.state.colmeia) {
            const apiaryId = this.state.selectedApiary.id;
            
            this.props.deleteColmeiaById(hiveId, apiaryId);
          }
        }},
      ],
      {cancelable: false},
    );
  };

  render() {
    const hiveId = this.props.navigation.getParam("hive", "").id;
    const hive = this.props.navigation.getParam("hive", "");
    const hiveName = this.props.navigation.getParam("hive", "").nome;
    const hiveDescription = this.props.navigation.getParam("hive", "").descricao;

    return (
      <Container>
        <HeaderCustomStack 
          title="Detalhes"
          description="Aqui, você pode editar os dados da sua colmeia ou excluí-los"
          typeIconRight = "AntDesign"
          iconRight = "delete"
          handleIconRight
          typeIconRight2 = "AntDesign"
          iconRight2 = "edit"
          handleIconRight2
        />

        <View style = {styles.containerContent}>
          <View style = {styles.viewImage}>
            <Image style={styles.imageFormColmeia} source={{ uri: hive.foto}}/>
          </View>

          
          <TouchableOpacity onPress={() => alert('oiii')} style = {styles.changePhoto}>
            <Icon style={{color: colors.white, fontSize: 20}} active type="Entypo" name="camera"/>
          </TouchableOpacity> 
          

          <View style = {styles.viewInputs}>
            <Item>
              <Icon style={{color: colors.theme_second}} active type="Ionicons" name="md-finger-print"/>
              <Text style = {{fontFamily: 'Montserrat Regular', fontSize: 13 }}>{hiveName}</Text>
            </Item>
            <Item style = {{marginTop: 20}}>
              <Icon style={{color: colors.theme_second}} active type="MaterialIcons" name="view-headline"/>
              <Text style = {{fontFamily: 'Montserrat Regular', fontSize: 13 }}>{hiveDescription}</Text>
            </Item>
          </View>
        </View>
      </Container>
    );
  }
}

export default HiveDetails;