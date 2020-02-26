import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { PersistGate } from "redux-persist/integration/react";
import Routers from "./config/routes";
import theme from "./config/theme";
import initializeStore from "./redux/store";
import Loader from "./components/loader";

const { store, persistor } = initializeStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Routers />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
