import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#212121", contrastText: "#ffffff" },
    secondary: { main: "#333333", contrastText: "#ffffff" },
    error: {
      main: red[900]
    },
    background: {
      default: "#bbdefb"
    }
  }
});

export default theme;
