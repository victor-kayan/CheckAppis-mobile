import React from "react";
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import {
  Home,
  Visita,
  Colmeia,
  Intervencao,
  Perfil,
  AboutApp
} from "./src/screens/drawerScreens";
import { Login, LoadingLogin } from "./src/screens/switchScreens";
import {
  NewColmeia,
  EditColmeia,
  DetalhesVisita,
  NewVisitaApiario,
  NewVisitaColmeia,
  IntervencaoApiario,
  IntervencaoColmeia,
  DetalhesVisitaColmeia,
  DetalhesIntervencao,
  HiveList,
  VisitList,
  InterventionHiveList,
  DetailsInterventionHive
} from "./src/screens/stackScreens";
import colors from "./assets/colors";
import { SideBar } from "./src/componentes";
import { Root } from "native-base";

if (__DEV__) {
  import('./src/config/ReactotronConfig');
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Root>
          <SwitchNavigator/>
        </Root>
      </Provider>
    );
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    Home,
    Colmeia,
    Visita,
    Intervencao,
    Perfil,
    AboutApp
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: colors.white
    }
  }
);

const StackNavigator = createStackNavigator(
  {
    DrawerNavigator,
    NewColmeia,
    EditColmeia,
    NewVisitaApiario,
    NewVisitaColmeia,
    IntervencaoApiario,
    IntervencaoColmeia,
    DetalhesVisitaColmeia,
    DetalhesVisita,
    DetalhesIntervencao,
    HiveList,
    VisitList,
    InterventionHiveList,
    DetailsInterventionHive,
  },
  {
    initialRouteName: "DrawerNavigator",
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: colors.white
    }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    LoadingLogin,
    StackNavigator,
    Login
  },
  {
    initialRouteName: "LoadingLogin",
    navigationOptions: {
      headerTransparent: true
    }
  }
);
