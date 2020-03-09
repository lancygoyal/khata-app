import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default ({
  open,
  handlePrimary,
  handleSecondary,
  title,
  desc,
  primaryBtnTxt,
  secondaryBtnTxt
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleSecondary}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSecondary} color="primary">
          {secondaryBtnTxt}
        </Button>
        <Button onClick={handlePrimary} color="primary" autoFocus>
          {primaryBtnTxt}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
