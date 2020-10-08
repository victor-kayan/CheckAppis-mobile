import React from "react";
import {View, Text, Modal, TouchableOpacity} from "react-native";
import styles from "./styles";

const ModalConfirm = ({
  title,
  text,
  onCancel,
  onConfirm,
  modalVisible,
  button,
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
                <View style = {styles.viewText}>
                    <Text style = {styles.title}>{title}</Text>
                    <Text style = {styles.text}>{text}</Text>
                </View>
                <View style = {styles.viewButtons}>
                    <TouchableOpacity onPress = {onCancel} style = {styles.cancelButton}>
                        <Text style = {styles.textButtonCancel}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {onConfirm} style = {styles.okButton}>
                        <Text style = {styles.textButton}>{button}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

export default ModalConfirm;
