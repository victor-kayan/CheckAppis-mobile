import React from "react";
import { AsyncStorage, NetInfo, StatusBar } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../../redux/actions/userActions";

import { Toast } from "native-base";
import { constants, routes } from "../../../../assets";
import ViewLogin from "./ViewLogin";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false,
    message: "",
    connect: false
  };

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setIsconected(isConnected ? true : false);
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setIsconected(isConnected ? true : false);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.redirectTo(nextProps);
  }

  setIsconected(connect) {
    this.setState({ connect });
  }

  login = async () => {
    if (this.state.connect) {
      const { email, password } = this.state;
      const { login } = this.props;

      this.setState({ error: false });

      if (email == "" || password == "") {
        this.setState({ error: true, message: "Preencha todos os campos" });
      } else if (!email.includes("@")) {
        this.setState({ error: true, message: "Email inválido." });
      } else {
        await login({ email, password });
      }
    } else {
      alert("Falha na Conexão.", "Erro ao tentar conectar ao servidor.");
    }
  };

  redirectTo = async nextProps => {
    if (nextProps.logged == true) {
      try {
        await AsyncStorage.setItem(
          `@checkAppisApp:${constants.ACCESS_TOKEN}`,
          nextProps.token
        );
      } catch (error) {
        throw error;
      }
      this.props.navigation.navigate(routes.Home);
    } else if (
      nextProps.logged == false &&
      nextProps.loading == false &&
      this.state.email != ""
    ) {
      this.setState({ error: true, message: "Email ou senha inválidos." });
      Toast.show({
        text: "Verifique seu email e senha",
        textStyle: { textAlign: 'center', fontFamily: 'Montserrat Regular' },
        type: "danger"
      });
    }
  };

  navigateToOnboarding = () => {
    AsyncStorage.removeItem(`@checkAppisApp:${constants.HAS_ACCESSED_BEFORE}`);
    this.props.navigation.navigate(routes.Onboarding);
  }

  render() {
    const { loading } = this.props;
    const { error, email, password, message } = this.state;

    return (
      <>
        <StatusBar hidden />
        <ViewLogin
          message={message}
          error={error}
          email={email}
          handleEmail={email => this.setState({ email })}
          password={password}
          handlePassword={password => this.setState({ password })}
          handleLogin={this.login}
          loading={loading}
          goToOnboarding={this.navigateToOnboarding}
        />
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loading: state.userState.loading,
    logged: state.userState.logged,
    token: state.userState.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
