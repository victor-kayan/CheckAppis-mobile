import React from 'react';
import { Icon, Button } from "native-base";
import {View, Text, TouchableOpacity, ImageBackground, Image, TouchableHighlight} from 'react-native';
import styles from "./styles";
import { SwipeRow } from 'react-native-swipe-list-view';
import { routes, colors } from '../../../assets';




export default class Hive extends React.Component {
    render () {
        return (
          <SwipeRow
            key={(this.props.hiveId)}
            leftOpenValue={65}
            rightOpenValue={-65}
          >

            <View style={styles.swiperBackContent}>
                <TouchableOpacity 
                  onPress={() => alert ('esquerdo')}
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
                <Image source = {{uri: this.props.image}} style = {styles.image}/>
              </View>
              <View style = {styles.contentText}>
                <Text style = {styles.hiveName}>{this.props.name}</Text>
                <Text style = {styles.hiveDescription}>{this.props.description}</Text>
              </View>
              <View style = {styles.contentArrow}>
                <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
              </View>
            </View>

          </SwipeRow>
        );
    }
}

// {/* <Button
//                   style={{height: '100%', borderBottomLeftRadius: 15, borderTopLeftRadius: 15, }}
//                   onPress={() => this.props.navigation.navigate(routes.EditColmeia, this.props.hive)
//                   }
//                 > */}