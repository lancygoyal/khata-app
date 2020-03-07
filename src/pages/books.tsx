import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import MaterialTable from "material-table";
import find from "lodash/find";
import filter from "lodash/filter";
import { TYPES } from "../constants/app";
import moment from "moment";

const styles = theme => createStyles({});

interface BooksProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

interface BooksState {}

class Books extends React.Component<BooksProps, BooksState> {
  render() {
    const { classes, t, ledger } = this.props;

    return (
      <div style={{ padding: 25, paddingBottom: 70 }}>
        <MaterialTable
          columns={[
            { title: "Account Name", field: "account.accountName" },
            { title: "City", field: "account.city" },
            { title: "Contact Number", field: "account.contactNumber" },
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
          data={ledger}
          title="Ledger Book"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ accounts, ledger }) => ({
  ledger: filter(ledger).map(data => ({
    ...data,
    account: find(accounts, ["id", data.accountId])
  }))
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Books)));
