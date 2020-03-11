import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import { setLocale, setPath } from "../redux";
import { LANGS } from "../constants/app";
import { Paper, Button, Grid } from "@material-ui/core";
import { backupData, getFolderPath } from "../utils/common";
import Restore from "../components/user/restoreData";

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
  setPath
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocale((event.target as HTMLInputElement).value);
  };

  const backupFile = () => {
    let { path } = app;
    if (!path) {
      path = getFolderPath(t("app:backupFolderPath"));
      setPath(path);
    }
    backupData(store, path, t("app:backupFolderPath"));
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
            <Restore />
          </Grid>
        </FormControl>
      </Paper>
    </div>
  );
};

const mapStateToProps = store => ({ store, app: store.app });

const mapDispatchToProps = { setLocale, setPath };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Settings)));
