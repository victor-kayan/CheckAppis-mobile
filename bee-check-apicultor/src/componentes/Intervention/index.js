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
        //       Ex. de output: "Até amanhã", "Até ontem", "Inicie em três dias" etc.
        // TODO: Adicionar função a utils/ para ser utilizada também em outros componentes da aplicação.

        const day = moment(date).format('DD');
        const month = moment(date).format('MMMM');
        const year = moment(date).format('YYYY');
    
        return `Até ${day} de ${month} de ${year}`;
    }

    render () {
        return (
          <View style = {styles.intervention}>
            <View>
                <Text style = {styles.apiaryName}>{this.props.apiaryName}</Text>
                <Text style = {styles.date}>{this.formatDateToString(this.props.deadline)}</Text>
                {this.props.isDone ? (
                    <Text style={{ fontWeight: 'bold', color: 'darkgreen' }}>CONCLUÍDO</Text>
                ) : (
                    <Text style={{ fontWeight: 'bold', color: 'red' }}>PENDENTE</Text>
                )}
            </View>
            
            <TouchableOpacity onPress={() => this.props.openInterventionApiary(this.props.intervention)}>
                <View style = {styles.button}>
                    <Text style = {styles.textButton}>Visualizar</Text>
                </View>
            </TouchableOpacity>
              
          </View>
        );
    }
}
