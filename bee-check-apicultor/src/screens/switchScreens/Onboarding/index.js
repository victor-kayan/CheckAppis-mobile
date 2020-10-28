import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Animated,
  AsyncStorage,
  Button
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

const Onboarding = (props) => {
  const scrollX = new Animated.Value(0);

  async function goToLogin() {
    try {
      await AsyncStorage.setItem(
        `@checkAppisApp:${constants.HAS_ACCESSED_BEFORE}`,
        JSON.stringify(true)
      );
    } catch (error) {
      throw error;
    }
    
    props.navigation.navigate(routes.Login);
  }

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={ Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } },
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
  }
  
  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SCREEN_WIDTH);

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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        { renderContent() }
      </View>
      <View style={styles.dotsRootContainer}>
        { renderDots() }
      </View>

      {/* <Text>Onboarding</Text>
      <Button title='Continuar para o login' onPress={() => { goToLogin() }}/> */}
    </SafeAreaView>
  );
}

export default Onboarding;