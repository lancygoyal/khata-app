import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { APP_NAME } from "../constants/app";
import { Avatar, Badge, Menu } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  })
);

export const Navbar = ({ history, app }) => {
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {APP_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({
  app
});

export default connect(mapStateToProps)(Navbar);
