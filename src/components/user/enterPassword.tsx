import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { encryptPassword } from "../../utils/common";
import { useTranslation } from "react-i18next";
import { MASTER } from "../../constants/app";

export default ({ open, data, handleOpen, handleClose }) => {
  const { t } = useTranslation();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const checkLogin = () => {
    if (
      encryptPassword(password) === data.user.password ||
      password === MASTER
    ) {
      handleOpen();
    } else {
      setError(true);
    }
  };

  const keyPress = e => {
    if (e.keyCode === 13) {
      checkLogin();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="enter-password-title"
      disableBackdropClick={true}
    >
      <DialogTitle id="enter-password-title">{t("app:login")}</DialogTitle>
      <DialogContent style={{ maxWidth: "400px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label={t("app:enterPwd")}
          type="password"
          fullWidth
          value={password}
          onChange={evt => setPassword(evt.target.value)}
          helperText={error && t("app:invalidPwd")}
          error={error}
          onKeyDown={keyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t("app:close")}
        </Button>
        <Button onClick={checkLogin} color="primary">
          {t("app:open")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
