import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { PersistGate } from "redux-persist/integration/react";
import { withTranslation, WithTranslation } from "react-i18next";
import Routers from "./config/routes";
import theme from "./config/theme";
import initializeStore from "./redux/store";
import Loader from "./components/loader";
import moment from "moment";
import IdleTimer from "react-idle-timer";
import { logout } from "./redux";
import "moment/locale/pa-in";
import { APP_IDLE_TIME, LOCALE } from "./constants/app";

const { store, persistor } = initializeStore();

interface AppProps extends WithTranslation {}

class App extends React.Component<AppProps> {
  unsubscribe;
  idleTimer;

  componentWillMount() {
    this.unsubscribe = store.subscribe(this.handleChange);
  }

  handleChange = () => {
    this.props.i18n.changeLanguage(store.getState().app.locale);
    moment.locale(LOCALE[store.getState().app.locale]);
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <IdleTimer
        ref={ref => {
          this.idleTimer = ref;
        }}
        element={document}
        onIdle={this.onIdle}
        debounce={250}
        timeout={APP_IDLE_TIME}
      >
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <Routers store={store} />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </IdleTimer>
    );
  }

  onIdle = () => {
    alert("User Logged Out!");
    console.log("last active", this.idleTimer.getLastActiveTime());
    store.getState().app.isLogin && store.dispatch(logout());
  };
}

export default withTranslation()(App);
