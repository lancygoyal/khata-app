import DateFnsUtils from "@date-io/date-fns";
import { Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import filter from "lodash/filter";
import find from "lodash/find";
import map from "lodash/map";
import sortBy from "lodash/sortBy";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { connect } from "react-redux";
import uniqid from "uniqid";
import AddDialog from "../components/daybook/addDialog";
import Records from "../components/daybook/records";
import { TYPES } from "../constants/app";
import { addAccount, addInvoice, setPath } from "../redux";
import { getCities } from "../utils/common";

const styles = (theme) =>
  createStyles({
    root: {
      padding: "10px 20px",
      userSelect: "none",
    },
    date: {
      fontWeight: "bold",
      fontSize: 20,
      float: "right",
    },
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(15),
      right: theme.spacing(10),
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
      borderBottomWidth: 1,
    },
    inOutRoot: {
      marginTop: "5vh",
      height: "90vh",
    },
    inOut: {
      height: "80vh",
      overflowY: "scroll",
      paddingRight: "10px",
    },
  });

interface DaybookProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

interface DaybookState {
  addDialog: boolean;
  date: Date;
}

class Daybook extends React.Component<DaybookProps, DaybookState> {
  state = {
    addDialog: false,
    date: new Date(),
  };

  handleAddDialog = () => {
    this.setState(({ addDialog }) => ({
      addDialog: !addDialog,
    }));
  };

  handleSave = (data) => {
    const { addAccount, addInvoice, user } = this.props;
    const {
      invoiceNumber,
      values: { accountName, city, contactNumber, addInfo, amount, notes },
      selectAccount,
      type,
      more,
      selectedDate,
    } = data;
    const dateNow = Date.now();
    const accountId = uniqid();

    if (data.addAccount) {
      const account = {
        id: accountId,
        accountName: accountName.toLowerCase().trim(),
        city: city.toLowerCase().trim(),
        contactNumber,
        addInfo,
        hasBankDetails: false,
        createAt: dateNow,
        createdBy: user.id,
      };
      addAccount(account);
    }
    const invoice = {
      id: uniqid(),
      invoiceNumber,
      accountId: data.addAccount ? accountId : selectAccount.id,
      amount,
      notes,
      type,
      hasInvoiceDtls: false,
      hasTax: false,
      mode: "CASH",
      createAt: new Date(selectedDate).getTime(),
      addedAt: dateNow,
      createdBy: user.id,
    };
    addInvoice(invoice);
    !more && this.handleAddDialog();
  };

  getLedger = () => {
    const { accounts, ledger } = this.props;
    const { date } = this.state;

    return {
      ledgerIn: filter(
        ledger,
        (o) =>
          o.type === TYPES.IN &&
          new Date(o.createAt).toLocaleDateString() ===
            new Date(date).toLocaleDateString()
      ).map((data) => ({
        ...data,
        account: find(accounts, ["id", data.accountId]),
      })),
      ledgerOut: filter(
        ledger,
        (o) =>
          o.type === TYPES.OUT &&
          new Date(o.createAt).toLocaleDateString() ===
            new Date(date).toLocaleDateString()
      ).map((data) => ({
        ...data,
        account: find(accounts, ["id", data.accountId]),
      })),
    };
  };

  render() {
    const { classes, t, accounts, cities, invoiceNumber } = this.props;
    const { addDialog, date } = this.state;
    const { ledgerIn, ledgerOut } = this.getLedger();

    return (
      <div className={classes.root}>
        <Typography
          component="h1"
          variant="h5"
          className={classes.date}
          color="secondary"
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              id="date-picker"
              format="dd-MM-yyyy"
              value={date}
              animateYearScrolling
              autoOk
              onChange={(val: Date) => this.setState({ date: val })}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
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
              <Records data={ledgerIn} />
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
              <Records data={ledgerOut} />
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
          invoiceNumber={invoiceNumber}
          open={addDialog}
          accounts={accounts}
          onClose={this.handleAddDialog}
          saveData={this.handleSave}
          cities={cities}
          date={date}
        />
        <KeyboardEventHandler
          handleKeys={["enter", "tab", "space"]}
          onKeyEvent={this.handleAddDialog}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ accounts, ledger, app: { user, path } }) => ({
  cities: getCities(accounts),
  accounts: sortBy(
    map(accounts, (o) => ({
      ...o,
      accountName: o.accountName.toLowerCase().trim(),
      city: o.city.toLowerCase().trim(),
    })),
    "accountName"
  ),
  ledger,
  invoiceNumber:
    ledger.length > 0 ? ledger[ledger.length - 1].invoiceNumber + 1 : 10001,
  user,
  path,
});

const mapDispatchToProps = { addAccount, addInvoice, setPath };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Daybook)));
