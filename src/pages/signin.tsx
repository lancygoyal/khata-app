import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { login } from "../redux/app";
import { Grid } from "@material-ui/core";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import LockIcon from "@material-ui/icons/Lock";
import { withTranslation, WithTranslation } from "react-i18next";
import EnterPassword from "../components/user/enterPassword";

const styles = theme =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textTransform: "capitalize"
    },
    firmName: {
      fontWeight: "bold",
      fontSize: 32
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 15,
      margin: theme.spacing(3)
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      width: 80,
      height: 80,
      margin: theme.spacing(1)
    },
    submit: {
      marginTop: theme.spacing(2)
    }
  });

interface SignInProps
  extends WithStyles,
    StateProps,
    DispatchProps,
    WithTranslation {
  history: any;
}

interface SignInState {
  data: any;
  loginDialog: boolean;
}

class SignIn extends React.Component<SignInProps, SignInState> {
  state = {
    data: null,
    loginDialog: false
  };

  handleLoginDialog = (user = null) => {
    this.setState(({ loginDialog }) => ({
      data: { user },
      loginDialog: !loginDialog
    }));
  };

  login = () => {
    const { login, history } = this.props;
    const {
      data: { user }
    } = this.state;
    login(user);
    this.handleLoginDialog();
    history.replace("/");
  };

  render() {
    const { classes, users, t } = this.props;
    const { loginDialog, data } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Typography
          component="h1"
          variant="h5"
          className={classes.firmName}
          color="secondary"
        >
          {t("app:firm")} - {users.find(user => user.isMaster).firmName}
        </Typography>
        <Grid container alignItems="center" justify="center">
          {[...users].map((user, idx) => (
            <Grid item xs={12} sm={5} key={idx}>
              <Paper className={classes.paper}>
                <Avatar alt={user.firmName} className={classes.avatar}>
                  {user.isMaster ? (
                    <EnhancedEncryptionIcon fontSize="large" />
                  ) : (
                    <LockIcon fontSize="large" />
                  )}
                </Avatar>
                <Typography component="h1" variant="h5">
                  {user.firstName + " " + user.lastName}
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => this.handleLoginDialog(user)}
                >
                  {t("app:login")}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <EnterPassword
          data={data}
          open={loginDialog}
          handleClose={this.handleLoginDialog}
          handleOpen={this.login}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(SignIn)));
