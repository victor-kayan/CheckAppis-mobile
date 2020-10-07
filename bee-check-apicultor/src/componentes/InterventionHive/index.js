import React from 'react';
import { Icon, Button } from "native-base";
import {View, Text, TouchableOpacity, ImageBackground, Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import { SwipeRow } from 'react-native-swipe-list-view';
import { routes, colors } from '../../../assets';
import moment from "moment";
import "moment/locale/pt-br";


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
                <Text style = {styles.apiaryName}>{this.props.name}</Text>
                <Text style = {styles.date}>{this.formatDateToString(this.props.creationDate)}</Text>

                { this.props.isConcluded && this.props.isConclusionSynced ? (
                    <Text style={{ fontWeight: 'bold', color: 'darkgreen' }}>CONCLUÍDO E SINCRONIZADO</Text>
                ) : this.props.isConcluded && !this.props.isConclusionSynced ? (
                    <Text style={{ fontWeight: 'bold', color: 'darkblue' }}>CONCLUÍDO MAS NÃO SINCRONIZADO</Text>
                ) : (
                    <Text style={{ fontWeight: 'bold', color: 'red' }}>PENDENTE</Text>
                )}
            </View>
            
            <TouchableOpacity onPress={() => this.props.openInterventionHive(this.props.interventionHive)}>
                <View style = {styles.button}>
                    <Text style = {styles.textButton}>Visualizar</Text>
                </View>
            </TouchableOpacity>
              
          </View>
        );
    }
}
