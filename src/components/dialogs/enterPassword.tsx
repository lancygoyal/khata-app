import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { encryptPassword } from "../../utils/common";

export default ({ open, data, handleOpen, handleClose }) => {
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const checkLogin = () => {
    if (encryptPassword(password) === data.user.password) {
      handleOpen();
    } else {
      setError(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="enter-password-title"
      disableBackdropClick={true}
    >
      <DialogTitle id="enter-password-title">Login</DialogTitle>
      <DialogContent style={{ width: "400px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Enter Password"
          type="password"
          fullWidth
          value={password}
          onChange={evt => setPassword(evt.target.value)}
          helperText={error && "Invalid Password"}
          error={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={checkLogin} color="primary">
          Open
        </Button>
      </DialogActions>
    </Dialog>
  );
};
