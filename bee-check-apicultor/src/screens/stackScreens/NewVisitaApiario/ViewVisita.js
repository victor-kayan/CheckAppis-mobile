// import React from "react";
// import styles from "./styles";
// import { Image } from 'react-native';
// import { Container, Content, Card, CardItem, Picker, Text, View, Left, Body, Right, Textarea } from "native-base";
// import { HeaderCustom, SpinnerCustom, HeaderCard, InputSwitch, ButtonCustom } from "../../../componentes";

// const ViewVisita = ({ ...rest,
//     state,
//     loading, 
//     apiarios, 
//     handleRefresh, 
//     onValueChangePickerApiario, 
//     onValueChangeIsAgua, 
//     onValueChangeIsSombra, 
//     onValueChangeIsComida,
//     onValueChangeobservacoes,
// }) => (
//   <Container>
//     <HeaderCustom
//       title="Visita"
//       iconRight="sync"
//       handleIconRight={handleRefresh}
//       typeIconRight="AntDesign"
//     />
//     <Content padder>
//       <SpinnerCustom visible={loading} />
//       <Card>
//         <HeaderCard
//           style={styles.header}
//           icon="edit"
//           typeIcon="FontAwesome"
//           title="Visitar Apiario"
//         />
//         <CardItem>
//           <Image
//             source={require("../../../../images/apiario.png")}
//             style={styles.iconImagemSelectPicker}
//           />
//           <Picker
//             mode="dropdown"
//             selectedValue={selectedPickerApiario}
//             style={styles.pikerLisitApiario}
//             onValueChange={onValueChangePickerApiario}
//           >
//             <Picker.Item
//               enabled={false}
//               key={null}
//               label={"Selecione um Apiario"}
//               value={null}
//             />
//             {!apiarios ? (
//               <Picker.Item
//                 enabled={false}
//                 note
//                 label={"Nenhum Apiario encontrado"}
//               />
//             ) : (
//               apiarios.map(data => {
//                 return (
//                   <Picker.Item key={data.id} label={data.nome} value={data} />
//                 );
//               })
//             )}
//           </Picker>
//         </CardItem>
//         <CardItem>
//           <Text style={styles.textSubTitle}>
//             Responda as questões abaixo sobre o apiario{" "}
//             {selectedPickerApiario && selectedPickerApiario.nome}
//           </Text>
//         </CardItem>
//         {selectedPickerApiario ? (
//           <View>
//             <CardItem>
//               <Left>
//                 <Text>Há Água?</Text>
//               </Left>
//               <Body />
//               <Right>
//                 <InputSwitch
//                   value={state.tem_agua}
//                   onValueChange={onValueChangeIsAgua} // this is necessary for this component
//                 />
//               </Right>
//             </CardItem>
//             <CardItem>
//               <Left>
//                 <Text>Está sombreado?</Text>
//               </Left>
//               <Body />
//               <Right>
//                 <InputSwitch
//                   value={state.tem_sombra}
//                   onValueChange={onValueChangeIsSombra} // this is necessary for this component
//                 />
//               </Right>
//             </CardItem>
//             <CardItem>
//               <Left>
//                 <Text>Há Comida?</Text>
//               </Left>
//               <Body />
//               <Right>
//                 <InputSwitch
//                   value={state.tem_comida}
//                   onValueChange={onValueChangeIsComida} // this is necessary for this component
//                 />
//               </Right>
//             </CardItem>
//             <CardItem>
//               <Textarea
//                 value={state.observacoes}
//                 onChangeText={onValueChangeobservacoes}
//                 rowSpan={5}
//                 style={{ width: "100%" }}
//                 bordered
//                 placeholder="Observações"
//               />
//             </CardItem>
//             <CardItem style={{ alignSelf: "flex-end" }}>
//               <ButtonCustom
//                 style={styles.buttonSalveVisita}
//                 onPress={() => this.onSaveVisita()}
//                 title="Visitar Colmeias"
//                 iconLeft="arrowright"
//                 typeIconLeft="AntDesign"
//               />
//             </CardItem>
//           </View>
//         ) : (
//           <CardItem>
//             <Text style={{ marginStart: 10 }}>
//               Primeiro selecione um apiario
//             </Text>
//           </CardItem>
//         )}
//       </Card>
//     </Content>
//   </Container>
// );

// export default ViewVisita;

// desenvolvimeto futuro