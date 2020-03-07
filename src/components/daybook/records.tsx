import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Humanize from "humanize-plus";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360
    },
    inline: {
      display: "inline",
      marginTop: 10
    },
    rupees: {
      fontWeight: "bold",
      fontSize: 14,
      padding: "0 10px",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopRightRadius: 3,
      width: 100
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
            primary={Humanize.capitalizeAll(`${obj.account.accountName}`)}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {Humanize.capitalizeAll(
                    `${obj.account.city} (${obj.account.contactNumber})`
                  )}
                </Typography>
                {obj.notes && (
                  <Tooltip title={obj.notes}>
                    <IconButton aria-label="Info" style={{ padding: 5 }}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
