import React from "react";
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import {
  Home,
  Colmeia,
  Visita,
  Intervencao
} from "./src/screens/drawerScreens";
import { Login, LoadingLogin } from "./src/screens/switchScreens";
import {
  NewColmeia,
  EditColmeia,
  NewVisitaApiario,
  NewVisitaColmeia,
  DetalhesVisitaColmeia,
  IntervencaoColmeia
} from "./src/screens/stackScreens";
import colors from "./assets/colors";
import { SideBar } from "./src/componentes";
import { Root } from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Root>
          <SwitchNavigator />
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
    Intervencao
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />,
    navigationOptions: {
      headerTransparent: true
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
    DetalhesVisitaColmeia,
    IntervencaoColmeia
  },
  {
    initialRouteName: "DrawerNavigator",
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: colors.black
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
