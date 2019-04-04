import React, { Component } from 'react';
import { View } from 'react-native';

import Dialog from "react-native-dialog";

class RemoveDialog extends Component {

    render() {
        const {visible, onCancel, onDelete} = this.props;
        return (
            <View>
                <Dialog.Container visible={ visible }>
                    <Dialog.Title>Exclusão de registro</Dialog.Title>
                    <Dialog.Description>
                        Deseja excluir este registro ?.
                    </Dialog.Description>
                    <Dialog.Button onPress={ onCancel } label="Cancelar" />
                    <Dialog.Button onPress={ onDelete } label="Excluir" />
                </Dialog.Container>
            </View>
        );
    }
}
export default RemoveDialog;

