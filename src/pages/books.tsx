import { Grid, TextField, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Humanize from "humanize-plus";
import filter from "lodash/filter";
import reduce from "lodash/reduce";
import map from "lodash/map";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";
import MaterialTable from "material-table";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import Confirm from "../components/confirm";
import AddDialog from "../components/daybook/addDialog";
import UpdateDialog from "../components/daybook/updateDialog";
import { TYPES } from "../constants/app";
import { addInvoice, updateInvoice, removeInvoice } from "../redux";
import { jsonToXLS, formatDate } from "../utils/common";
import uniqid from "uniqid";

const styles = (theme) => createStyles({});

interface BooksProps
  extends WithStyles,
  WithTranslation,
  StateProps,
  DispatchProps {
  history: any;
}

const Books: React.FC<BooksProps> = ({
  t,
  user,
  cities,
  accounts,
  addInvoice,
  updateInvoice,
  removeInvoice,
  invoiceNumber,
}) => {
  const [city, selectCity] = React.useState(null);
  const [account, selectAccount] = React.useState(null);
  const [addBill, handleAddBill] = React.useState(null);
  const [updateBill, handleUpdateBill] = React.useState(null);
  const [deleteBill, handleDeleteBill] = React.useState(null);
  const accountsByCity = city
    ? filter(accounts, (o) => o.city.toLowerCase() === city.toLowerCase())
    : [];
  const accountList = account ? filter(accountsByCity, ["id", account.id]) : [];

  const exportAccountsByCity = () => {
    const data = [];
    accountsByCity.forEach((o) => {
      const size = o.accLedgerOut.length > 5 ? 5 : o.accLedgerOut.length;
      size &&
        data.push({
          [t("app:accountName")]: Humanize.capitalizeAll(o.accountName),
          [t("app:contactNumber")]: o.contactNumber,
          [t("app:balance")]: o.balance,
        });
      size &&
        data.push({
          [t("app:accountName")]: "",
          [t("app:contactNumber")]: t("app:date"),
          [t("app:balance")]: t("app:out"),
        });
      for (let index = 0; index < size; index++) {
        const newo = o.accLedgerOut[index];
        data.push({
          [t("app:accountName")]: "",
          [t("app:contactNumber")]: formatDate(newo.createAt),
          [t("app:balance")]: Number(newo.amount),
        });
      }
    });
    jsonToXLS(data, city.toUpperCase());
  };
  const handleSave = (data) => {
    const {
      invoiceNumber,
      selectAccount,
      values: { amount, notes },
      type,
      more,
    } = data;
    const dateNow = Date.now();
    const invoice = {
      id: uniqid(),
      invoiceNumber,
      accountId: selectAccount.id,
      amount,
      notes,
      type,
      hasInvoiceDtls: false,
      hasTax: false,
      mode: "CASH",
      createAt: dateNow,
      createdBy: user.id,
    };
    addInvoice(invoice);
    !more && handleAddBill(null);
  };
  const handleEdit = (data) => {
    updateInvoice(updateBill.id, {
      ...data.values,
      type: data.type,
      createAt: new Date(data.selectedDate).getTime(),
    });
    handleUpdateBill(null);
  };

  return (
    <div style={{ padding: 25, paddingBottom: 70, userSelect: "none" }}>
      <Paper>
        <Grid container spacing={2} style={{ padding: 20 }}>
          <Grid item xs={5} sm={5}>
            <Autocomplete
              id="city"
              options={cities}
              blurOnSelect
              clearOnEscape
              autoHighlight
              autoSelect
              getOptionLabel={(option) => Humanize.capitalizeAll(option)}
              value={city}
              onChange={(event, newValue) => {
                selectCity(newValue);
                account && selectAccount(null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  label={t("app:city")}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              id="account"
              options={accountsByCity}
              blurOnSelect
              clearOnEscape
              disableOpenOnFocus
              autoHighlight
              autoSelect
              getOptionLabel={(option: any) =>
                Humanize.capitalizeAll(option.accountName)
              }
              value={account}
              onChange={(event, newValue) => {
                selectAccount(newValue);
              }}
              disabled={!city}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("app:account")}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid container item xs={1} sm={1} justify="center">
            {city ? (
              <Tooltip title={t("app:saveFile")}>
                <IconButton aria-label="export" onClick={exportAccountsByCity}>
                  <SaveAltIcon />
                </IconButton>
              </Tooltip>
            ) : (
                <IconButton aria-label="export">
                  <SaveAltIcon />
                </IconButton>
              )}
          </Grid>
        </Grid>
        <MaterialTable
          columns={[
            {
              title: t("app:accountName"),
              field: "accountName",
              render: (rowData: any) =>
                Humanize.capitalizeAll(rowData.accountName),
            },
            {
              title: t("app:contactNumber"),
              field: "contactNumber",
              render: (rowData: any) =>
                rowData.contactNumber ? rowData.contactNumber : <>&mdash;</>,
            },
            {
              title: t("app:addInfo"),
              field: "addInfo",
              render: (rowData: any) =>
                rowData.addInfo ? rowData.addInfo : <>&mdash;</>,
            },
            {
              title: `${t("app:total")} ${t("app:in")}`,
              field: "amtIn",
              render: (rowData: any) => <>&#8377; {rowData.amtIn}</>,
            },
            {
              title: `${t("app:total")} ${t("app:out")}`,
              field: "amtOut",
              render: (rowData: any) => <>&#8377; {rowData.amtOut}</>,
            },
            {
              title: t("app:balance"),
              field: "balance",
              render: (rowData: any) => <>&#8377; {rowData.balance}</>,
            },
          ]}
          options={{
            sorting: false,
            paging: false,
            draggable: false,
            toolbar: false,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: !city
                ? t("app:selectCityMsg")
                : !account
                  ? t("app:selectAccountMsg")
                  : t("app:emptyDataSourceMessage"),
            },
            toolbar: {
              searchTooltip: t("app:search"),
              searchPlaceholder: t("app:search"),
            },
          }}
          components={{
            Container: (props) => <div>{props.children}</div>,
          }}
          data={accountList}
        />
        {accountList[0] && <MaterialTable
          columns={[
            {
              title: t("app:date"),
              field: "createAt",
              render: (rowData: any) => formatDate(rowData.createAt),
              searchable: false,
              sorting: true,
            },
            // {
            //   title: t("app:invoiceNumber"),
            //   field: "invoiceNumber",
            //   searchable: true,
            // },
            {
              title: t("app:notes"),
              field: "notes",
              render: (rowData: any) =>
                rowData.notes ? rowData.notes : <>&mdash;</>,
              searchable: true,
              sorting: false,
            },
            {
              title: t("app:in"),
              field: "amount",
              render: (rowData: any) =>
                rowData.type === TYPES.IN ? (
                  <>&#8377; {rowData.amount}</>
                ) : (
                    <>&mdash;</>
                  ),
              searchable: true,
              sorting: false,
            },
            {
              title: t("app:out"),
              field: "amount",
              render: (rowData: any) =>
                rowData.type === TYPES.OUT ? (
                  <>&#8377; {rowData.amount}</>
                ) : (
                    <>&mdash;</>
                  ),
              searchable: true,
              sorting: false,
            },
          ]}
          data={accountList[0].accLedger}
          title={`${Humanize.capitalizeAll(accountList[0].accountName)} ${t(
            "app:ledger"
          )}`}
          options={{
            sorting: true,
            paging: true,
            padding: "dense",
            draggable: false,
            actionsColumnIndex: -1,
            // exportAllData: true,
            // exportButton: true,
            // exportFileName: Humanize.capitalizeAll(rowData.accountName),
          }}
          localization={{
            body: {
              emptyDataSourceMessage: t("app:emptyDataSourceMessage"),
            },
            toolbar: {
              searchTooltip: t("app:search"),
              searchPlaceholder: t("app:search"),
            },
          }}
          actions={[
            () => ({
              icon: "edit",
              tooltip: t("app:editInvoice"),
              onClick: (event, data) =>
                handleUpdateBill({
                  accountName: accountList[0].accountName,
                  ...data,
                }),
            }),
            () => ({
              icon: "delete",
              tooltip: t("app:removeInvoice"),
              onClick: (event, data) => handleDeleteBill(data),
            }),
            {
              icon: "add",
              tooltip: t("app:addRecord"),
              isFreeAction: true,
              onClick: (event) => handleAddBill(accountList[0]),
            },
          ]}
        />}
        <Confirm
          key={"delete-dialog-" + Boolean(deleteBill)}
          open={Boolean(deleteBill)}
          handlePrimary={() => {
            removeInvoice(deleteBill.id);
            handleDeleteBill(null);
          }}
          handleSecondary={() => handleDeleteBill(null)}
          title={t("app:removeInvoice")}
          desc={t("app:SureDelete")}
          primaryBtnTxt={t("app:yes")}
          secondaryBtnTxt={t("app:no")}
        />
        <AddDialog
          key={"add-dialog-" + Boolean(addBill)}
          invoiceNumber={invoiceNumber}
          open={Boolean(addBill)}
          accounts={[addBill]}
          cities={cities}
          onClose={() => handleAddBill(null)}
          saveData={handleSave}
          directAdd
        />
        {updateBill && (
          <UpdateDialog
            key={"update-dialog-" + Boolean(updateBill)}
            invoiceNumber={invoiceNumber}
            open={Boolean(updateBill)}
            accountName={updateBill.accountName}
            amount={updateBill.amount}
            notes={updateBill.notes}
            date={updateBill.createAt}
            invType={updateBill.type}
            onClose={() => handleUpdateBill(null)}
            saveData={handleEdit}
          />
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = ({ accounts, ledger, app: { user } }) => ({
  cities: map(uniqBy(accounts, "city"), "city"),
  accounts: map(accounts, (o) => {
    const accLedger = sortBy(filter(ledger, ["accountId", o.id]), [
      "createAt",
    ]).reverse();
    const accLedgerIn = filter(accLedger, ["type", TYPES.IN]);
    const accLedgerOut = filter(accLedger, ["type", TYPES.OUT]);
    const amtIn = reduce(
      accLedgerIn,
      (sum, n) => {
        return Number(sum) + Number(n.amount);
      },
      0
    );
    const amtOut = reduce(
      accLedgerOut,
      (sum, n) => {
        return Number(sum) + Number(n.amount);
      },
      0
    );
    const balance = amtOut - amtIn;
    return {
      ...o,
      accLedger,
      accLedgerIn,
      accLedgerOut,
      amtIn,
      amtOut,
      balance,
    };
  }),
  user,
  invoiceNumber:
    ledger.length > 0 ? ledger[ledger.length - 1].invoiceNumber + 1 : 10001,
});

const mapDispatchToProps = { addInvoice, updateInvoice, removeInvoice };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Books)));
