import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import { Typography } from "@material-ui/core";
import WbSunny from "@material-ui/icons/WbSunny";
import Grid from "@material-ui/core/Grid";
import Records from "../components/daybook/records";
import AddDialog from "../components/daybook/addDialog";

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
      position: "fixed",
      bottom: theme.spacing(10),
      right: theme.spacing(5)
    },
    title: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: 16,
      padding: 3,
      borderBottomStyle: "solid",
      borderBottomWidth: 1
    },
    inOutRoot: {
      marginTop: "50px",
      height: "90vh"
    },
    inOut: {
      height: "80vh",
      overflowY: "scroll",
      paddingRight: "10px"
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
  addDialog: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  state = {
    addDialog: false
  };

  handleAddDialog = () => {
    this.setState(({ addDialog }) => ({
      addDialog: !addDialog
    }));
  };

  render() {
    const { classes, t } = this.props;
    const { addDialog } = this.state;

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
        <Grid container spacing={0} className={classes.inOutRoot}>
          <Grid
            item
            xs={6}
            style={{ borderRightStyle: "solid", borderRightWidth: 1 }}
          >
            <Typography
              component="h1"
              variant="subtitle1"
              color="secondary"
              className={classes.title}
            >
              {t("app:in")}
            </Typography>
            <div className={classes.inOut}>
              <Records />
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography
              component="h1"
              variant="subtitle1"
              color="secondary"
              className={classes.title}
            >
              {t("app:out")}
            </Typography>
            <div className={classes.inOut}>
              <Records />
            </div>
          </Grid>
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.speedDial}
          onClick={this.handleAddDialog}
        >
          <AddIcon />
        </Fab>
        <AddDialog
          key={"add-dialog-" + addDialog}
          open={addDialog}
          handleClose={this.handleAddDialog}
        />
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
