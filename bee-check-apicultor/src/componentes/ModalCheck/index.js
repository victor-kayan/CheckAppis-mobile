import React from "react";
import { colors, images } from "../../../assets";
import {Left, Icon, Button, Body, Title, Right } from "native-base";
import {View, Text, Modal, TouchableOpacity} from "react-native";
import styles from "./styles";

const ModalCheck = ({
  title,
  text,
  onCancel,
  modalVisible,
  ...rest
}) => (
    <Modal 
    {... rest}
    visible = {modalVisible} 
    animationType = 'slide' 
    transparent = {true} 
    onRequestClose = {() => {}}>
        <View style = {styles.containerContent}>
            <View style = {styles.container}>
                <View style = {styles.viewGif}>
                    
                </View>
                <View style = {styles.viewText}>
                    <Text style = {styles.title}>{title}</Text>
                    <Text style = {styles.text}>{text}</Text>
                </View>
                <TouchableOpacity onPress = {onCancel} style = {styles.okButton}>
                    <Text style = {styles.textButton}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

export default ModalCheck;
