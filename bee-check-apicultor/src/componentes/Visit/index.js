import React from 'react';
import { Icon } from "native-base";
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles";
import moment from "moment";
import "moment/locale/pt-br";


export default class Visit extends React.Component {
    render () {
        return (
          <TouchableOpacity style = {styles.touchStyle} onPress = {() => this.props.openVisitList(this.props.visit, this.props.apiaryId, this.props.name)}>
            <View style = {styles.visit}>
                <View style = {styles.contentText}>
                  <Text style = {styles.apiaryName}>{`${moment(this.props.date).format("DD")} de `} {`${moment(this.props.date).format("MMMM")} de `} {`${moment(this.props.date).format("YYYY")}`}</Text>
                  {
                    this.props.hives && this.props.hivesLength == 0 
                    ? (<Text style = {styles.apiaryDescription}>Visita geral ao apiário</Text>)
                    : (<Text style = {styles.apiaryDescription}>Colmeia(s) visitada(s): {this.props.hives && this.props.hivesLength}</Text>)
                  }
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
          </TouchableOpacity>
        );
    }
}

