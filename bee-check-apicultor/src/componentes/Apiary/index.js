import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';


export default class Match extends React.Component {
    render () {
        return (
            <View>
                <View>
                    
                </View>
                <View>
                    <Text>{this.props.name}</Text>
                    <Text>{this.props.description}</Text>
                </View>
                <View>

                </View>
            </View>
        );
    }
}