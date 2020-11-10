import React from "react";
import { TouchableOpacity, ScrollView, TouchableHighlight } from "react-native";

import moment from "moment";
import "moment/locale/pt-br";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteVisita } from "../../../redux/actions/visitaActions";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";

import { Container, View, Text, Icon } from "native-base";
import { colors, routes, images } from "../../../../assets";
import LinearGradient from "react-native-linear-gradient";
import ModalSync from "../../../componentes/ModalFeedback";
import ModalConfirm from "../../../componentes/ModalConfirm";
import ModalFeedback from "../../../componentes/ModalFeedback";
import styles from "./styles";

class DetalhesVisita extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visit: this.props.navigation.getParam("visit", ""),
      apiary: this.props.navigation.getParam("apiary", ""),
      modalVisibleSync: false,
      modalVisibleConfirm: false,
      modalVisibleTrash: false,
    };
  }

  // abrir modal de sincronização 
  openModalSync = () => {
    this.setState({modalVisibleSync: true});
  };

  // fechar modal de sincronização
  closeModalSync = () => {
    this.setState({modalVisibleSync: false});
  };

  // abrir modal de feedback de exclusão 
  openModalConfirm = () => {
    this.setState({modalVisibleConfirm: true});
  };

  // fechar modal de feedback de exclusão
  closeModalConfirm = () => {
    this.setState({modalVisibleConfirm: false});
    //this.props.navigation.navigate(routes.VisitList);
  };

  // abrir modal de feedback de exclusão 
  openModalTrash = () => {
    this.setState({modalVisibleTrash: true});
  };

  // fechar modal de feedback de exclusão
  closeModalTrash = () => {
    this.setState({modalVisibleTrash: false});
    this.props.navigation.goBack();
  };

  // deletar visita
  deleteVisit = () => {
    this.props.deleteVisita(this.state.visit.id, this.state.apiary.id);

    this.closeModalConfirm();
    this.openModalTrash();
  };

  render() {
    const visita = this.props.navigation.getParam("visit", "");
    const apiaryId = this.props.navigation.getParam("apiary", "").id;
    const apiaryName = this.props.navigation.getParam("apiary", "").nome;

    return (
      <Container>
        <HeaderCustomStack 
          title="Detalhes da Visita"
          description="Veja os detalhes da visita selecionada anteriormente"
          iconRight="delete"
          typeIconRight="AntDesign"
          handleIconRight={() => this.openModalConfirm()}
        />
        <View style = {styles.viewContent}>

          {/* nome do apiário e status de sincronização */}
          <TouchableOpacity onPress = {() => this.openModalSync()} style = {styles.viewTitle}>
            <Text style = {styles.apiaryName} numberOfLines={1}>Visita ao {apiaryName}</Text>
            {
              visita.isSynced
              ? (<Icon type="AntDesign" name="checkcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> TRUE; visita.permanentlyFailed -> FALSE
              : visita.permanentlyFailed
              ? (<Icon type="AntDesign" name="closecircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> TRUE 
              : (<Icon type="AntDesign" name="clockcircleo" style={styles.statusIcon} iconSize={5} active/>) // visita.isSynced -> FALSE; visita.permanentlyFailed -> FALSE
            }
          </TouchableOpacity>

          {/* informações gerais sobre a visita realizada */}
          <View style = {styles.contentDetails}>
            <ScrollView contentContainerStyle = {{ width: '100%'}} showsVerticalScrollIndicator = {false}>
              <View style = {styles.cardInformation}>
                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="AntDesign" name="calendar" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Data</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{moment(visita.created_at).format("DD/MM/YYYY")}</Text>
                  </View>
                </View>

                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="AntDesign" name="cloudo" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Está sombreado?</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{visita && visita && visita.tem_sombra ? "Sim" : "Não"}</Text>
                  </View>
                </View>

                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="MaterialIcons" name="grain" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Tem água?</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{visita && visita && visita.tem_agua ? "Sim" : "Não"}</Text>
                  </View>
                </View>

                <View style = {styles.lineCardInformation}>
                  <View style = {styles.lineHeader}>
                    <Icon type="AntDesign" name="apple-o" style = {styles.icons}/>
                    <Text style = {styles.textLineHeader}>Tem comida?</Text>
                  </View>
                  <View style = {styles.lineBody}>
                    <Text style = {styles.textBodyLine}>{visita && visita && visita.tem_comida ? "Sim" : "Não"}</Text>
                  </View>
                </View>
              </View>

              {/* informações sobre as colmeias analisadas */}
              <View style = {styles.cardInformationMore}>
                <View style = {styles.headerInformation}>
                  <Icon type="EvilIcons" name="archive" style = {styles.icons, {fontSize: 40, color: colors.theme_second}}/>
                  <View style = {styles.titles}>
                    <Text style = {styles.titleInformation}>Colmeias</Text>
                    <Text style = {styles.descriptionInformation}>Total de colmeias analisadas: {visita.visita_colmeias.length}</Text>
                  </View>
                </View>
                <View style = {styles.dataInformations}>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com postura</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_com_postura}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Sem postura</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_sem_postura}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com abelha morta</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_com_abelhas_mortas}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Sem abelha morta</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_colmeias_sem_abelhas_mortas}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* informações sobre os quadros analisados */}
              <View style = {styles.cardInformationMore}>
                <View style = {styles.headerInformation}>
                  <Icon type="AntDesign" name="laptop" style = {styles.icons}/>
                  <View style = {styles.titles}>
                    <Text style = {styles.titleInformation}>Quadros</Text>
                    <Text style = {styles.descriptionInformation}>Total de quadros analisados: {visita.qtd_quadros_analizados}</Text>
                  </View>
                </View>
                <View style = {styles.dataInformations}>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com mel</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_quadros_mel}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com pólen</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_quadros_polen}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com cria aberta</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_cria_aberta}</Text>
                    </View>
                  </View>
                  <View style = {styles.lineDataInformations}>
                    <View style = {styles.size}>
                      <Text style = {styles.textLineDataInformations}>Com cria fechada</Text>
                    </View>
                    <View style = {styles.sizeData}>
                      <Text style = {styles.infoLineDataInformations}>{visita && visita && visita.qtd_cria_fechada}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* observações realizadas */}
              <View style = {styles.cardInformationMore}>
                <View style = {styles.headerInformation}>
                  <Icon type="EvilIcons" name="navicon" style = {styles.icons, {fontSize: 40, color: colors.theme_second}}/>
                  <View style = {styles.titles}>
                    <Text style = {styles.titleInformation}>Observações</Text>
                    <Text style = {styles.descriptionInformation}>Observações feitas durante a visita</Text>
                  </View>
                </View>
                <View style = {styles.dataInformations}>
                  <View style = {styles.lineDataInformations}>
                    {
                      visita.observacao == null ? 
                      (
                        <Text style = {styles.textLineDataInformations}>Nenhuma observação importante foi feita durante a visita.</Text>
                      ) : (
                        <Text style = {styles.textLineDataInformations}>{visita.observacao + `                                                            `}</Text>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style = {{height: 120}}/>

            </ScrollView>
          </View>
        </View>
        {
          visita.visita_colmeias.length == 0
          ? (<View/>)
          : (
            <View style = {styles.viewButtonDetails}>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#ff8500"
                onPress={() => this.props.navigation.navigate(routes.DetalhesVisitaColmeia,{visita_colmeias: visita.visita_colmeias})}
                style = {{borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}
              >
                <LinearGradient
                  colors={[colors.theme_default, colors.theme_second]}
                  style={{ height: '100%', borderRadius: 30}}
                >
                  <Text style={{ color: colors.white, fontFamily: 'Montserrat-Bold', fontSize: 13, letterSpacing: 1, marginHorizontal: 30, marginTop: 15}}>DETALHAR POR COLMEIA</Text> 
                </LinearGradient>
              </TouchableHighlight>
            </View>
          )
        }

          <ModalSync
            modalVisible = {this.state.modalVisibleSync}
            onCancel = {this.closeModalSync}
            gif = {images.gif.sync}
            title = 'Status de Sincronização'
            text = {visita.isSynced ? ('Sua visita está sincronizada. Todos os dados estão guardados de forma segura.') : visita.permanentlyFailed ? ('A sincronização dessa visita falhou permanentemente.') : visita.isSynced === false && ('Aguardando conexão com a internet para sincronizar essa visita.')}
          />

          <ModalConfirm
            modalVisible = {this.state.modalVisibleConfirm}
            onCancel = {this.closeModalConfirm}
            onConfirm = {() => this.deleteVisit()}
            title = 'Excluir Visita'
            text = 'Tem certeza que deseja excluir esta visita permanentemente?'
            button = 'Excluir'
          />

          <ModalFeedback
            modalVisible = {this.state.modalVisibleTrash}
            onCancel = {this.closeModalTrash}
            gif = {images.gif.trash}
            title = 'Visita excluída com sucesso'
            text = 'A visita selecionada foi excluída com sucesso e, por isso, não poderá mais ser acessada.'
          />
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { deleteVisita },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetalhesVisita);