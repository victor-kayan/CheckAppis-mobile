import React from "react";
import {
  AsyncStorage,
  NetInfo,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../../redux/actions/userActions";
import { constants, routes } from "../../../../assets";
import ViewLogin from "./ViewLogin";

class Login extends React.Component {

  state = {
    email: "apicultor@gmail.com",
    password: "123456",
    error: false,
    message: "",
    connect: false
  };

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log("First, is " + (isConnected ? "online" : "offline"));
      this.setIsconected(isConnected ? true : false);
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log("First, is " + (isConnected ? "online" : "offline"));
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
        this.setState({ error: true, message: "Email Invalido" });
      } else {
        await login({ email, password });
      }
    } else {
      alert("Falha na Conexão", "erro ao tentar conectar ao servidor.");
    }
  };

  redirectTo = async nextProps => {
    if (nextProps.logged == true) {
      try {
        await AsyncStorage.setItem(
          `@beecheckApp:${constants.ACCESS_TOKEN}`,
          nextProps.token
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
      this.props.navigation.navigate(routes.Home);
    } else if (
      nextProps.logged == false &&
      nextProps.loading == false &&
      this.state.email != ""
    ) {
      this.setState({ error: true, message: "Email ou senha invalidos" });
    }
  };

  render() {
    const { loading } = this.props;
    const { error, email, password, message } = this.state;

    return (
      <ViewLogin
        message={message}
        error={error}
        email={email}
        handleEmail={email => this.setState({email})}
        password={password}
        handlePassword={password => this.setState({password})}
        handleLogin={this.login}
        loading={loading}
      />
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    loading: state.userState.loading,
    logged: state.userState.logged,
    token: state.userState.token
  };
}

// // Doing this merges our actions into the component’s props,
// // while wrapping them in dispatch() so that they immediately dispatch an Action.
// // Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

