import { Grid, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import filter from "lodash/filter";
import find from "lodash/find";
import uniqBy from "lodash/uniqBy";
import map from "lodash/map";
import MaterialTable from "material-table";
import moment from "moment";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { TYPES } from "../constants/app";
import Humanize from "humanize-plus";

const styles = theme => createStyles({});

interface BooksProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

const Books: React.FC<BooksProps> = ({
  classes,
  t,
  cities,
  accounts,
  ledger
}) => {
  const [city, selectCity] = React.useState(null);
  const [account, selectAccount] = React.useState(null);

  return (
    <div style={{ padding: 25, paddingBottom: 70 }}>
      <Paper>
        <Grid container spacing={2} style={{ padding: 10 }}>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              id="city"
              options={cities}
              blurOnSelect
              clearOnEscape
              disableOpenOnFocus
              autoHighlight
              autoSelect
              getOptionLabel={option => Humanize.capitalizeAll(option)}
              value={city}
              onChange={(event, newValue) => {
                selectCity(newValue);
                account && selectAccount(null);
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  autoFocus
                  label="City"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              id="account"
              options={
                city
                  ? filter(
                      accounts,
                      o => o.city.toLowerCase() === city.toLowerCase()
                    )
                  : []
              }
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
              renderInput={params => (
                <TextField
                  {...params}
                  label="Account"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          {account && (
            <>
              <Grid item xs={6} sm={6}>
                <TextField
                  variant="filled"
                  fullWidth
                  label={t("app:contactNumber")}
                  value={account.contactNumber}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  variant="filled"
                  fullWidth
                  label={"Balance"}
                  value={account.contactNumber}
                />
              </Grid>
              {account.addInfo && (
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="filled"
                    fullWidth
                    multiline
                    rows="3"
                    label={t("app:addInfo")}
                    value={account.addInfo}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
        <MaterialTable
          columns={[
            { title: "Invoice Number", field: "invoiceNumber" },
            { title: "Notes", field: "notes" },
            {
              title: "Date",
              field: "createAt",
              render: (rowData: any) =>
                moment(rowData.createAt).format("Do MMM YYYY")
            },
            {
              title: "In",
              field: "amount",
              render: (rowData: any) =>
                rowData.type === TYPES.IN && rowData.amount
            },
            {
              title: "Out",
              field: "amount",
              render: (rowData: any) =>
                rowData.type === TYPES.OUT && rowData.amount
            }
          ]}
          options={{
            sorting: false,
            paging: false
          }}
          components={{
            Toolbar: props => <div />,
            Container: props => <div>{props.children}</div>
          }}
          data={account ? filter(ledger, ["accountId", account.id]) : []}
          title="Ledger Book"
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = ({ accounts, ledger }) => ({
  cities: map(uniqBy(accounts, "city"), "city"),
  accounts,
  ledger
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Books)));
