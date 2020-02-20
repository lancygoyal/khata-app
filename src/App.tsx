import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import Routers from "./config/routes";
import theme from "./config/theme";
import initializeStore from "./redux/store";

const store = initializeStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routers />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
