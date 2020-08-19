import React from 'react';
import { Icon } from "native-base";
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles";


export default class Apiary extends React.Component {
    render () {
        return (
          <TouchableOpacity style = {styles.touchStyle} onPress = {() => this.props.openList(this.props.apiaryId, this.props.name)}>
            <View style = {styles.apiary}>
                <View style = {styles.contentText}>
                  <Text style = {styles.apiaryName}>{this.props.name}</Text>
                  <Text style = {styles.apiaryDescription}>{this.props.description}</Text>
                </View>
                <View style = {styles.contentArrow}>
                  <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
                </View>
            </View>
          </TouchableOpacity>
        );
    }
}