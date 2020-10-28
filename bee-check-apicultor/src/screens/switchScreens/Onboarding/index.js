import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Animated,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import { routes, constants, images } from '../../../../assets';
import styles from './styles';

const { SCREEN_WIDTH } = constants;
const onboardingPagesData = [
  {
    title: 'TÍTULO DA PÁGINA 01',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque cum asperiores expedita vel.',
    img: images.cards.apiary
  },
  {
    title: 'TÍTULO 02',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptates quo cumque earum? Maxime sint assumenda omnis tempore, nemo ipsum repellendus quaerat nostrum cumque nisi iusto pariatur earum harum expedita!', 
    img: images.cards.hive
  },
  {
    title: 'PÁGINA 03',
    description: ' Maxime sint assumenda omnis tempore, nemo ipsum repellendus quaerat nostrum cumque nisi iusto pariatur earum harum expedita!',
    img: images.cards.inter
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
      if (Math.floor(value / SCREEN_WIDTH) === onboardingPagesData.length - 2) {
        this.setState({ completed: true })   
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
      style={styles.nextButton}
      onPress={() => { this.goToLogin() }}
    >
      <Text style={styles.nextButtonText}>
        { this.state.completed ? 'Entrar' : 'Pular' }
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
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