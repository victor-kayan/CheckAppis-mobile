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
            <View style = {styles.apiary}>
                <View style = {styles.contentText}>
                  <Text style = {styles.apiaryName}>{`${moment(this.props.date).format("DD")} de `} {`${moment(this.props.date).format("MMMM")} de `} {`${moment(this.props.date).format("YYYY")}`}</Text>
                  <Text style = {styles.apiaryDescription}>Colmeias visitadas: {this.props.hives && this.props.hivesLength}</Text>
                </View>
                <View style = {styles.contentArrow}>
                  <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
                </View>
            </View>
          </TouchableOpacity>
        );
    }
}

