import React from "react";
import {View, Text, Modal, TouchableOpacity, Image} from "react-native";
import styles from "./styles";

const ModalFeedback = ({
  title,
  text,
  onCancel,
  modalVisible,
  gif,
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
                    <Image source ={gif} style = {styles.gif}/>
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

export default ModalFeedback;
