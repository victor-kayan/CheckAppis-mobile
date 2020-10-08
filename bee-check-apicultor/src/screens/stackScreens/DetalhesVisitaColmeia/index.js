import React from "react";
import { Container, Text, View } from "native-base";
import { Image, ScrollView, StatusBar } from "react-native";
import styles from "./styles";
import { images } from "../../../../assets";
import HeaderCustomStack from "../../../componentes/HeaderCustomStack";
import HiveDetails from "../../../componentes/HiveDetails";

class DetalhesVisitaColmeia extends React.Component {
  render() {
    const visita_colmeias = this.props.navigation.getParam("visita_colmeias", "");

    return (
      <Container>
        <HeaderCustomStack 
          title={`Detalhes da Visita`}
          description = "Veja as informações da visita separadas por colmeia analisada" 
        />
        <View style = {styles.container}>
          <Text style = {styles.title}>Detalhamento por colmeia</Text>
          <View style = {styles.contentHiveDetails}>
            <ScrollView contentContainerStyle = {{width: '100%'}} showsVerticalScrollIndicator = {false}>
              {
                visita_colmeias && visita_colmeias.map (visitHive => {
                  return (
                    <HiveDetails
                      name = {visitHive.colmeia && visitHive.colmeia.nome}
                      description = {visitHive.colmeia && visitHive.colmeia.descricao}
                      mel = {visitHive.qtd_quadros_mel}
                      polen = {visitHive.qtd_quadros_polen}
                      aberta = {visitHive.qtd_cria_aberta}
                      fechada = {visitHive.qtd_cria_fechada}
                      vazio = {visitHive.qtd_quadros_vazios}
                      postura = {visitHive.is_postura}
                      morta = {visitHive.is_abelhas_mortas}
                      zangao = {visitHive.tem_zangao}
                      realeira = {visitHive.tem_realeira}
                      obs = {visitHive.observacao}
                      key = {visitHive.colmeia.id}
                      visitHive = {visitHive}
                      image = {visitHive.colmeia.foto}
                    />
                  );
                })
              }
              <View style = {{height: 200}}/>
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

export default DetalhesVisitaColmeia;