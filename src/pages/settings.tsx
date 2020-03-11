import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import { setLocale, restoreState } from "../redux";
import { LANGS } from "../constants/app";
import { Paper, Button, Grid } from "@material-ui/core";
import { decryptData, backupData } from "../utils/common";

const styles = theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(3)
    }
  });

interface SettingsProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

const Settings: React.FC<SettingsProps> = ({
  classes,
  t,
  store,
  app,
  setLocale,
  restoreState
}) => {
  let fileRestoreInput = null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocale((event.target as HTMLInputElement).value);
  };

  const backupFile = () => {
    backupData(store);
  };

  const uploadFile = e => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const output = e.target.result;
        restoreState(decryptData(output));
      };
      reader.readAsText(files[0]);
    }
  };

  return (
    <div style={{ padding: 25, paddingBottom: 70 }}>
      <Paper>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{t("app:selectLang")}</FormLabel>
          <RadioGroup
            aria-label="language"
            name="language"
            value={app.locale}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value={LANGS.EN}
              control={<Radio />}
              label="English"
            />
            <FormControlLabel
              value={LANGS.PA}
              control={<Radio />}
              label="ਪੰਜਾਬੀ"
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper style={{ marginTop: 10 }}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            {t("app:backup")}/{t("app:restore")}
          </FormLabel>
          <Grid
            container
            item
            xs={12}
            sm={12}
            justify="center"
            alignItems="center"
            style={{ marginTop: 10 }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
              onClick={backupFile}
            >
              {t("app:backup")}
            </Button>
            <input
              id={"fileRestoreInput"}
              ref={e => (fileRestoreInput = e)}
              type="file"
              onChange={uploadFile}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => fileRestoreInput.click()}
            >
              {t("app:restore")}
            </Button>
          </Grid>
        </FormControl>
      </Paper>
    </div>
  );
};

const mapStateToProps = store => ({ store, app: store.app });

const mapDispatchToProps = { setLocale, restoreState };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Settings)));
