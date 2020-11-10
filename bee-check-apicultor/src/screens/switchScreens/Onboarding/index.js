import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Animated,
  AsyncStorage,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { routes, constants, images } from '../../../../assets';
import styles from './styles';

const { SCREEN_WIDTH } = constants;
const onboardingPagesData = [
  {
    title: 'Olá. Seja bem vindo(a) ao CheckAppis!',
    description: 'O CheckAppis é o seu aplicativo para gerenciamento de colmeias, colônias e apiários. Ele é completo e pode te ajudar de maneira fácil e rápida a realizar os processos diários da sua criação de abelhas.',
    img: images.onboarding.welcome
  },
  {
    title: 'Armazene as informações de maneira segura',
    description: 'Com o CheckAppis, você pode armazenar todas as informações dos seus apiários de forma segura, consultando-as sempre que necessário. Todas as informações são armazenadas no nosso banco de dados e estarão sempre disponíveis para te atender.',
    img: images.onboarding.security
  },
  {
    title: 'Aumente sua produção apícola',
    description: 'Monitorando suas informações através do CheckAppis, e com a ajuda de um técnico em apicultura, você pode evitar disperdícios, mortes de abelhas, entre outros problemas. Assim, sua produção tem mais chances de alavancar! ', 
    img: images.onboarding.increase
  },
  {
    title: 'Pronto(a) para dar um check no seu apiário?',
    
    img: images.onboarding.check
  },
];

class Onboarding extends Component {
  state = {
    scrollX: new Animated.Value(0),
    completed: false
  };

  componentDidMount() {
    const { scrollX } = this.state;

    scrollX.addListener(({ value }) => {
      if (Math.round(value / SCREEN_WIDTH) === onboardingPagesData.length - 1) {
        this.setState({ completed: true });
      } else {
        this.setState({ completed: false });
      }
    });

    return () => scrollX.removeListener();
  }

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

  renderContent = () => (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEnabled
      snapToAlignment='center'
      showsHorizontalScrollIndicator={false}
      onScroll={ Animated.event([
        { nativeEvent: { contentOffset: { x: this.state.scrollX } } },
      ], { useNativeDriver: false })}
    >
      { onboardingPagesData.map(page => (
        <View key={page.title} style={styles.pageContainer}>
          {/* Imagem */}
          <View style={styles.imageContainer}>
            <Image style={styles.pageImage} source={page.img} resizeMode='cover'/>
          </View>

          {/* Textos */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{page.title}</Text>
            <Text style={styles.description}>{page.description}</Text>
          </View>
        </View>
      ))}
    </Animated.ScrollView>
  );
  
  renderDots = () => {
    const dotPosition = Animated.divide(this.state.scrollX, SCREEN_WIDTH);
    
    return (
      <View style={styles.dotsContainer}>
        { onboardingPagesData.map((page, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 17, 8],
            extrapolate: "clamp"
          });

          return (
            <Animated.View
              key={index}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            />
          );
        })}
      </View>
    );
  }

  renderNextButton = () => (
    <TouchableOpacity
      style={this.state.completed ? styles.getInButton : styles.nextButton}
      onPress={() => { this.goToLogin() }}
    >
      { this.state.completed ?
        <Text style={styles.getInButtonText}>
          VAMOS LÁ!
        </Text>
        :
        <Text style={styles.nextButtonText}>
          PULAR
        </Text>
      }
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle='dark-content' />

        <>
          { this.renderContent() }
        </>
        <View style={styles.dotsRootContainer}>
          { this.renderDots() }
        </View>
        <>
          { this.renderNextButton() }
        </>
      </SafeAreaView>
    );
  }
}

export default Onboarding;