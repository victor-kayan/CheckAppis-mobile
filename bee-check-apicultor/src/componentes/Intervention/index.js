import React from 'react';
import { Icon, Button } from "native-base";
import {View, Text, TouchableOpacity, ImageBackground, Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import { SwipeRow } from 'react-native-swipe-list-view';
import { routes, colors } from '../../../assets';
import moment from "moment";
import "moment/locale/pt-br";

export default class Intervention extends React.Component {
    formatDateToString = date => {
        // TODO: Fazer cálculos com base na data atual e mostrar informação com base no dia de hoje.
        // TODO: Decidir, com base na data atual, se será mostrado a data de conclusão ou de início.
        //       Ex.: "Até amanhã", "Até ontem", "Inicia sexta-feira" etc.
        // TODO: Só mostrar ano caso for diferente do ano atual.
        // TODO: Mostrar nome do mês abreviado (menos abril)
        // TODO: Adicionar dia da semana no padrão. Ex.: quarta-feira, 07 de out.
        // TODO: Adicionar função a utils/ para ser utilizada também em outros componentes da aplicação.

        const day = moment(date).format('DD');
        const month = moment(date).format('MMMM');
        const year = moment(date).format('YYYY');
    
        return `${day} de ${month} de ${year}`;
    }

    render () {
        return (
          <View style = {styles.intervention}>
            <View>
                <Text style = {styles.apiaryName} numberOfLines = {1}>{this.props.apiaryName}</Text>
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
            
            <TouchableOpacity onPress={() => this.props.openInterventionApiary(this.props.intervention)}>
                <View style = {styles.button}>
                    <Text style = {styles.textButton}>Visualizar</Text>
                </View>
            </TouchableOpacity>
              
          </View>
        );
    }
}
