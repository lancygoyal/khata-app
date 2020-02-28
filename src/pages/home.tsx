import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { createAccount } from "../redux/users";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { encryptPassword } from "../utils/common";
import { ALPHA_SPACE_DOT } from "../constants/regex";

const styles = theme =>
  createStyles({
    paper: {
      marginTop: theme.spacing(9),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  });

interface SignUpProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

interface SignUpState {
  showPassword: boolean;
}

class SignUp extends React.Component<SignUpProps, SignUpState> {
  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    this.setState(({ showPassword }) => ({
      showPassword: !showPassword
    }));
  };

  render() {
    const { classes, history, t, createAccount } = this.props;
    const { showPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        Home
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { createAccount };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(SignUp)));
