import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Humanize from "humanize-plus";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360
    },
    inline: {
      display: "inline"
    },
    rupees: {
      fontWeight: "bold",
      fontSize: 14,
      padding: "0 10px",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopRightRadius: 3
    },
    listBody: {
      borderLeftWidth: 1,
      borderLeftStyle: "solid",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomLeftRadius: 3,
      paddingLeft: 10,
      paddingBottom: 5
    }
  })
);

export default ({ data }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {data.map((obj, idx) => (
        <ListItem key={idx} alignItems="flex-start" style={{ padding: 0 }}>
          <ListItemAvatar style={{ marginTop: 4 }}>
            <Typography
              component="h1"
              variant="body2"
              className={classes.rupees}
              color="textPrimary"
            >
              {Humanize.formatNumber(obj.amount)}
            </Typography>
          </ListItemAvatar>
          <ListItemText
            className={classes.listBody}
            primary={`${obj.account.accountName}, ${obj.account.city} (${obj.account.contactNumber})`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  View
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
