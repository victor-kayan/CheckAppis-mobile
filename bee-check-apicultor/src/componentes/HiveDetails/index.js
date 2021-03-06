import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from "./styles";
import "moment/locale/pt-br";
import { images } from '../../../assets';


export default class HiveDetails extends React.Component {
    render () {
        return (
          <View style = {styles.hiveDetails}>
            <View style = {styles.header}>
              <View style = {styles.viewImage}>
                { typeof(this.props.image) === 'string' ? (  // Colmeia já sincronizada. 'image' é o link da imagem no Amazon AWS.
                    <Image source = {{uri: this.props.image}} style = {styles.image}/>
                  ) : this.props.image.data ? (  // Colmeia ainda não sincronizada e possui imagem. 'image.data' é a imagem em Base64.
                    <Image
                      source = {{uri: `data:image/png;base64,${this.props.image.data}`}}
                      style = {styles.image}
                    />
                  ) : ( // Colmeia ainda não cadastra e não possui imagem.
                    <Image source = {images.fotoDefault} style = {styles.image}/>
                  )
                }
                {/* <Image source = {this.props.image && this.props.image ? {uri: this.props.image} : images.fotoDefault}  style = {styles.image}/> */}
              </View>
              <View style = {styles.viewName}>
                <Text style = {styles.hiveName} numberOfLines = {1}>{this.props.name}</Text>
                <Text style = {styles.hiveDescription} numberOfLines = {2}>{this.props.description}</Text>
              </View>
            </View>
            <View style = {styles.body}>
              <View style = {styles.bodyIn}>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com mel</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.mel}</Text>
                  </View>
                </View>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com pólen</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.polen}</Text>
                  </View>
                </View>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com cria aberta</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.aberta}</Text>
                  </View>
                </View>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com cria fechada</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.fechada}</Text>
                  </View>
                </View>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Vazios</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.vazio}</Text>
                  </View>
                </View>
              </View>
              <View style = {styles.bodyIn}>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com postura?</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.postura ? "Sim" : "Não"}</Text>
                  </View>
                </View>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com abelhas mortas?</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.mortah ? "Sim" : "Não"}</Text>
                  </View>
                </View>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com zangão?</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.zangao ? "Sim" : "Não"}</Text>
                  </View>
                </View>
                <View style = {styles.line}>
                  <View style = {styles.size}>
                    <Text style = {styles.textTitle}>Com realeira?</Text>
                  </View>
                  <View styles = {styles.sizeData}>
                    <Text style = {styles.textData}>{this.props.realeira ? "Sim" : "Não"}</Text>
                  </View>
                </View>
              </View>
              <View style = {styles.bodyObs}>
                <Text style = {styles.textObs}>Observações</Text>
                {
                  this.props.obs == null ? 
                  (
                    <Text style = {styles.textDataObs}>Nenhuma observação importante sobre esta colmeia.</Text>
                  ) : (
                    <Text style = {styles.textDataObs}>{this.props.obs}</Text>                                                          
                  )
                }
              </View>
            </View>
          </View>
        );
    }
}

{/* <TouchableOpacity style = {styles.touchStyle} onPress = {() => this.props.openVisitList(this.props.visit, this.props.apiaryId, this.props.name)}>
            <View style = {styles.apiary}>
                <View style = {styles.contentText}>
                  <Text style = {styles.apiaryName}>{`${moment(this.props.date).format("DD")} de `} {`${moment(this.props.date).format("MMMM")} de `} {`${moment(this.props.date).format("YYYY")}`}</Text>
                  <Text style = {styles.apiaryDescription}>Colmeias visitadas: {this.props.hives && this.props.hivesLength}</Text>
                </View>
                <View style = {styles.contentArrow}>
                  {
                    this.props.sync
                    ? (<Icon type="AntDesign" name="checkcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> TRUE; visita.permanentlyFailed -> FALSE
                    : this.props.fail
                    ? (<Icon type="AntDesign" name="closecircleo" style={styles.statusIconFailed} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> TRUE 
                    : (<Icon type="AntDesign" name="clockcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> FALSE
                  }
                  <Icon type="Entypo" name="chevron-right" style={styles.arrow} iconSize={5} active/>
                </View>
            </View>
          </TouchableOpacity> */}

