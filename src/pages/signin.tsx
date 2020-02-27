import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setUser } from "../redux/app";

const styles = theme =>
  createStyles({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
      width: 144,
      height: 144
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  });

interface SignInProps extends WithStyles, StateProps, DispatchProps {
  firebase: any;
  history: any;
}

class Hello extends React.Component<SignInProps> {
  render() {
    const { classes, app } = this.props;
    const userName = app.isLogin
      ? `Hello ${app.user.displayName}`
      : "Hello Guest";
    const userImage = app.isLogin
      ? app.user.photoURL
      : "https://w5insight.com/wp-content/uploads/2014/07/placeholder-user-400x400.png";
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar alt={userName} src={userImage} className={classes.avatar} />
          <Typography component="h1" variant="h5">
            {userName}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {app.isLogin ? "Logout" : "Login"}
          </Button>
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = { setUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Hello));
