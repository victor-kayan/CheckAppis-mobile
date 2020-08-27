import React from 'react';
import { Icon, Button } from "native-base";
import {View, Text, TouchableOpacity, ImageBackground, Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import { SwipeRow } from 'react-native-swipe-list-view';
import { routes, colors } from '../../../assets';
import moment from "moment";
import "moment/locale/pt-br";

export default class Hive extends React.Component {
    render () {
        return (
          <View style = {styles.intervention}>
            <View>
                <Text style = {styles.apiaryName}>{this.props.apiaryName}</Text>
                <Text style = {styles.date}>{`${moment(this.props.date).format("DD")} de`} {`${moment(this.props.date).format("MMMM")} de`} {`${moment(this.props.date).format("YYYY")}`}</Text>
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
