import React from 'react';
import { Icon } from "native-base";
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles";
import moment from "moment";
import "moment/locale/pt-br";


export default class HiveDetails extends React.Component {
    render () {
        return (
          <View>
            <View>
              <View>
              </View>
              <View>
                <Text>Nome da colmeia</Text>
                <Text>Descrição da colmeia</Text>
              </View>
            </View>
            <View>
              <View>
                <View>
                  <Text>Com mel</Text>
                  <Text>00</Text>
                </View>
                <View>
                  <Text>Com pólen</Text>
                  <Text>00</Text>
                </View>
                <View>
                  <Text>Com cria aberta</Text>
                  <Text>00</Text>
                </View>
                <View>
                  <Text>Com cria fechada</Text>
                  <Text>00</Text>
                </View>
                <View>
                  <Text>Vazios</Text>
                  <Text>00</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>Com postura?</Text>
                  <Text>Sim</Text>
                </View>
                <View>
                  <Text>Com abelhas mortas?</Text>
                  <Text>Não</Text>
                </View>
                <View>
                  <Text>Com zangão?</Text>
                  <Text>Sim</Text>
                </View>
                <View>
                  <Text>Com realeira?</Text>
                  <Text>Não</Text>
                </View>
              </View>
              <View>
                <Text>Observações</Text>
                <Text>As observações serão colocadas aqui desta forma. Caso não haja, aparecerá um texto avisando.</Text>
              </View>
            </View>
          </View>
        );
    }
}

{/* <TouchableOpacity style = {styles.touchStyle} onPress = {() => this.props.openVisitList(this.props.visit, this.props.apiaryId, this.props.name)}>
            <View style = {styles.apiary}>
                <View style = {styles.contentText}>
                  <Text style = {styles.apiaryName}>{`${moment(this.props.date).format("DD")} de `} {`${moment(this.props.date).format("MMMM")} de `} {`${moment(this.props.date).format("YYYY")}`}</Text>
                  <Text style = {styles.apiaryDescription}>Colmeias visitadas: {this.props.hives && this.props.hivesLength}</Text>
                </View>
                <View style = {styles.contentArrow}>
                  {
                    this.props.sync
                    ? (<Icon type="AntDesign" name="checkcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> TRUE; visita.permanentlyFailed -> FALSE
                    : this.props.fail
                    ? (<Icon type="AntDesign" name="closecircleo" style={styles.statusIconFailed} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> TRUE 
                    : (<Icon type="AntDesign" name="clockcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> FALSE
                  }
                  <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
                </View>
            </View>
          </TouchableOpacity> */}

