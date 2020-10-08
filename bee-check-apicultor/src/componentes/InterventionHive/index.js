import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import moment from "moment";
import { Icon, Button } from "native-base";



export default class InterventionHive extends React.Component {
    formatDateToString = date => {
        const day = moment(date).format('DD');
        const month = moment(date).format('MMMM');
        const year = moment(date).format('YYYY');
    
        return `${day} de ${month} de ${year}`;
    }
    
    render () {
        return (
          <View style = {styles.intervention}>
            <View>
                <Text style = {styles.apiaryName} numberOfLines={1}>{this.props.name}</Text>
                <Text style = {styles.date}>{this.formatDateToString(this.props.creationDate)}</Text>
            </View>

            { 
                this.props.isConcluded && this.props.isConclusionSynced ? (
                    <Icon type="AntDesign" name="checkcircleo" style={styles.statusIcon} iconSize={5} active/>
                ) : this.props.isConcluded && !this.props.isConclusionSynced ? (
                    <Icon type="AntDesign" name="clockcircleo" style={styles.statusIcon} iconSize={5} active/>
                ) : (
                    <View style = {{height: 25, width: 25, marginLeft: '12%'}}/>
                )
            }

            <TouchableOpacity onPress={() => this.props.openInterventionHive(this.props.interventionHive)}>
                <View style = {styles.button}>
                    <Text style = {styles.textButton}>Visualizar</Text>
                </View>
            </TouchableOpacity>
          </View>
        );
    }
}
