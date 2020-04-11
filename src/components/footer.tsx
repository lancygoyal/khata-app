import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { APP_VER } from "../constants/app";

export const fmtMSS = (s) => (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;

const Copyright = () => {
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    const tick = setInterval(() => setTime(time + 1), 1000);
    return () => {
      clearInterval(tick);
    };
  });

  return (
    <Typography variant="body2" color="secondary">
      {"v"}
      {APP_VER}
      {" | © "}
      <span>Lancy Goyal</span> {new Date().getFullYear()}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 39,
    paddingRight: 10,
    userSelect: "none",
  },
}));

const Footer = () => {
  const classes = useStyles({});
  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  );
};

export default Footer;
