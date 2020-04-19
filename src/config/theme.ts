import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#212121", contrastText: "#ffffff" },
    secondary: { main: "#333333", contrastText: "#ffffff" },
    error: {
      main: red[900],
    },
    background: {
      default: "#bbdefb",
    },
    action: { active: "#2962ff", hover: "#82b1ff", selected: "#e0e0e0" },
  },
});

export default theme;
