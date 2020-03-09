import React from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import { setLocale } from "../redux";
import { LANGS } from "../constants/app";
import { Paper, Divider } from "@material-ui/core";

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

const Settings: React.FC<SettingsProps> = ({ classes, t, app, setLocale }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocale((event.target as HTMLInputElement).value);
  };

  return (
    <div style={{ padding: 25, paddingBottom: 70 }}>
      <Paper>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select Language</FormLabel>
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
      <Divider/>
      <Paper>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Backup/Restore</FormLabel>
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
    </div>
  );
};

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = { setLocale };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Settings)));
