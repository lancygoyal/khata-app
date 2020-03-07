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
import { addAccount, addInvoice } from "../redux";
import uniqid from "uniqid";
import find from "lodash/find";
import filter from "lodash/filter";
import { TYPES } from "../constants/app";

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

interface DaybookProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

interface DaybookState {
  addDialog: boolean;
}

class Daybook extends React.Component<DaybookProps, DaybookState> {
  state = {
    addDialog: false
  };

  handleAddDialog = () => {
    this.setState(({ addDialog }) => ({
      addDialog: !addDialog
    }));
  };

  handleSave = data => {
    const { addAccount, addInvoice, user } = this.props;
    const {
      invoiceNumber,
      values: { accountName, city, contactNumber, addInfo, amount, notes },
      selectAccount,
      type,
      more
    } = data;
    const dateNow = Date.now();
    const accountId = uniqid();

    if (data.addAccount) {
      const account = {
        id: accountId,
        accountName,
        city,
        contactNumber,
        addInfo,
        hasBankDetails: false,
        createAt: dateNow,
        createdBy: user.id
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
      createAt: dateNow,
      createdBy: user.id
    };
    addInvoice(invoice);
    !more && this.handleAddDialog();
  };

  render() {
    const { classes, t, accounts, ledgerIn, ledgerOut } = this.props;
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
          invoiceNumber={10001}
          open={addDialog}
          accounts={accounts}
          onClose={this.handleAddDialog}
          saveData={this.handleSave}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ accounts, ledger, app: { user } }) => ({
  accounts,
  ledgerIn: filter(ledger, ["type", TYPES.IN]).map(data => ({
    ...data,
    account: find(accounts, ["id", data.accountId])
  })),
  ledgerOut: filter(ledger, ["type", TYPES.OUT]).map(data => ({
    ...data,
    account: find(accounts, ["id", data.accountId])
  })),
  user
});

const mapDispatchToProps = { addAccount, addInvoice };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Daybook)));
