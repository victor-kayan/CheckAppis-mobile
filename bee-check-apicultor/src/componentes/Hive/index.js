import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Icon } from "native-base";
import { SwipeRow } from 'react-native-swipe-list-view';
import { colors, images } from '../../../assets';
import styles from "./styles";

export default class Hive extends React.Component {
  render () {
    const { hive, image } = this.props;

    return (
      <SwipeRow
        key={(this.props.hiveId)}
        leftOpenValue={65}
        rightOpenValue={-65}
      >
        <View style={styles.swiperBackContent}>
            <TouchableOpacity 
              onPress={() => this.props.deleteHive(this.props.hiveId)}
              style={styles.leftTouch}
            >
              <View style={styles.leftIcon}>
                <Icon
                  type="Ionicons" 
                  name="trash" 
                  style={{color: colors.white}}
                  />
                </View>
              </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => this.props.openEditHive(this.props.hive)}
              style={styles.rightTouch}
            >
              <View style={styles.rightIcon}>
                <Icon
                  type="MaterialIcons" 
                  name="edit" 
                  style={{color: colors.white}}
                />
              </View>
            </TouchableOpacity>
        </View>

        <View style = {styles.hive}>
          <View style = {styles.hiveImage}>
            { typeof(image) === 'string' ? (  // Colmeia já sincronizada. 'image' é o link da imagem no Amazon AWS.
                <Image source = {{uri: image}} style = {styles.image}/>
              ) : image.data ? (  // Colmeia ainda não sincronizada e possui imagem. 'image.data' é a imagem em Base64.
                <Image
                  source = {{uri: `data:image/png;base64,${image.data}`}}
                  style = {styles.image}
                />
              ) : ( // Colmeia ainda não cadastra e não possui imagem.
                <Image source = {images.fotoDefault} style = {styles.image}/>
              )
            }
          </View>
          <View style = {styles.contentText}>
            { hive.isSynced ? ( // Colmeia SINCRONIZADA
                <Text style={{ color: 'darkgreen', fontWeight: 'bold' }}>SINCRONIZADO</Text>
              ) : hive.permanentlyFailed ? (  // Criação da colmeia FALHOU PERMANENTEMENTE
                <Text style={{ color: 'red', fontWeight: 'bold' }}>FALHOU PERMANENTEMENTE</Text>
              ) : hive.isSynced === false && ( // Colmeia AINDA NÃO SINCRONIZADA
                <Text style={{ color: 'darkorange', fontWeight: 'bold' }}>AINDA NÃO SINCRONIZADA</Text>
              )
            }
            <Text style = {styles.hiveName} numberOfLines = {1}>{this.props.name}</Text>
            <Text style = {styles.hiveDescription} numberOfLines = {2}>{this.props.description}</Text>
          </View>
          <View style = {styles.contentArrow}>
            <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
          </View>
        </View>

      </SwipeRow>
    );
  }
}