import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import moment from "moment";
import { Icon, Button } from "native-base";


export default class InterventionHIve extends React.Component {
    render () {
        return (
          <View style = {styles.intervention}>
            <View>
                <Text style = {styles.apiaryName}>{this.props.name}</Text>
                <Text style = {styles.date}>{moment(this.props.hive.created_at).format("DD")} de {moment(this.props.hive.created_at).format("MMMM")} de {moment(this.props.hive.created_at).format("YYYY")}</Text>
            </View>

            <Icon type="AntDesign" name="closecircleo" style={styles.statusIcon} iconSize={5} active/>

            <TouchableOpacity onPress={() => this.props.openInterventionHive(this.props.interventionHive)}>
                <View style = {styles.button}>
                    <Text style = {styles.textButton}>Visualizar</Text>
                </View>
            </TouchableOpacity>
          </View>
        );
    }
}
