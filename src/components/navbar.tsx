import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    user: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      padding: '20px 10px',
      minWidth: 250
    },
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500]
    }
  })
);

const Navbar = ({ collapsed, data }) => {
  const classes = useStyles();
  const { user } = useSelector((state: any) => state.app);
  const history = useHistory();
  const location = useLocation();
  const handleListItemClick = (path: string) => {
    history.push(path);
  };

  return (
    <div className={classes.root}>
      <div className={classes.user}>
        <Avatar className={classes.avatar}>
          {user.firstName[0] + user.lastName[0]}
        </Avatar>
        <Typography
          component="h1"
          variant="subtitle1"
          style={{ marginLeft: 20 }}
        >
          {user.firstName + " " + user.lastName}
        </Typography>
      </div>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {data.map((nav, idx) => (
          <ListItem
            key={idx}
            button
            selected={location.pathname === nav.path}
            onClick={_ => handleListItemClick(nav.path)}
          >
            <ListItemIcon>
              <nav.icon />
            </ListItemIcon>
            <ListItemText primary={nav.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default Navbar;
