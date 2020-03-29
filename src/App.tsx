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
import "moment/locale/pa-in";
import { LOCALE } from "./constants/app";

const { store, persistor } = initializeStore();

interface AppProps extends WithTranslation {}

class App extends React.Component<AppProps> {
  unsubscribe;

  componentWillMount() {
    this.unsubscribe = store.subscribe(this.handleChange);
  }

  handleChange = () => {
    const { i18n } = this.props;
    i18n.changeLanguage(store.getState().setting.locale);
    moment.locale(LOCALE[store.getState().setting.locale]);
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Routers store={store} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default withTranslation()(App);
