import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

import { routes, constants } from '../../../../assets';
import styles from './styles';

class Onboarding extends Component {
  goToLogin = async () => {
    try {
      await AsyncStorage.setItem(
        `@checkAppisApp:${constants.HAS_ACCESSED_BEFORE}`,
        JSON.stringify(true)
      );
    } catch (error) {
      throw error;
    }
    
    this.props.navigation.navigate(routes.Login);
  }

  render() {
    return (
      <View>
        <Text>Onboarding</Text>

        <Button title='Continuar para o login' onPress={() => { this.goToLogin() }}/>
      </View>
    );
  }
}

export default Onboarding;