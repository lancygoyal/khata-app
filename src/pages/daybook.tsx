import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import { Typography, Button } from "@material-ui/core";
import WbSunny from "@material-ui/icons/WbSunny";
import Grid from "@material-ui/core/Grid";

const styles = theme =>
  createStyles({
    root: {
      padding: "10px 20px"
    },
    date: {
      fontWeight: "bold",
      fontSize: 20,
      float: "right"
    },
    speedDial: {
      position: "absolute",
      bottom: theme.spacing(10),
      right: theme.spacing(5)
    }
  });

interface HomeProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

interface HomeState {
  showPassword: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="h5"
          className={classes.date}
          color="secondary"
        >
          <WbSunny style={{ top: "5px", position: "relative" }} />{" "}
          {moment().format("dddd, Do MMMM YYYY")}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button variant="contained">In</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained">Out</Button>
          </Grid>
        </Grid>
        <Fab color="primary" aria-label="add" className={classes.speedDial}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Home)));
