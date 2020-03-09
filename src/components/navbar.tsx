import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../redux";

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
      padding: "20px 10px",
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
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const handleListItemClick = (path: string, title: string) => {
    history.push(path);
    title === "logout" && dispatch(logout());
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
      <List component="nav" aria-label="library">
        {data.map((nav, idx) => (
          <ListItem
            key={idx}
            button
            selected={location.pathname === nav.path}
            onClick={_ => handleListItemClick(nav.path, nav.title)}
          >
            <ListItemIcon>
              <nav.icon />
            </ListItemIcon>
            <ListItemText primary={t(`app:${nav.title}`)} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};

export default Navbar;
