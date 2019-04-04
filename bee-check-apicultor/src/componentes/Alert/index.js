import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Alert extends React.Component {

    render() {
        if (this.props.type == "error"){
            return (
                <View style={styles.componentErro}>
                    <Text style={styles.messageErro}>{this.props.message}</Text>
                </View>
            );
        }
        else if (this.props.type == "success") {
            return (
                <View style={styles.componentSuccess}>
                    <Text style={styles.messageSuccess}>{this.props.message}</Text>
                </View>
            );
        }
		
    }
}

const styles = StyleSheet.create({
    componentErro: {
        borderColor: '#f5c6cb',
        backgroundColor: "#f8d7da",
        marginBottom: 10,
        padding: 10,
        borderRadius: 3,
        borderStyle: 'solid',
    },
    messageErro: {
        alignSelf: 'center',
        color: '#721c24',
        fontSize: 15,
    },
    componentSuccess: {
        borderColor: '#c3e6cb',
        backgroundColor: "#d4edda",
        marginBottom: 10,
        padding: 10,
        borderRadius: 3,
        borderStyle: 'solid',
    },
    messageSuccess: {
        alignSelf: 'center',
        color: '#155724',
        fontSize: 15,
    },
});