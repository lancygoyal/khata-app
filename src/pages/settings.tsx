import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Formik } from "formik";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as Yup from "yup";
import Restore from "../components/user/restoreData";
import { LANGS, MASTER } from "../constants/app";
import { changePassword, logout, setLocale, setPath } from "../redux";
import {
  backupData,
  encryptPassword,
  setBackupTime,
  getBackupTime
} from "../utils/common";

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
  history,
  store,
  app,
  setLocale,
  changePassword,
  logout
}) => {
  const [showPassword, handleShowPassword] = React.useState(false);
  const [backupTime, handleBackupTime] = React.useState(
    localStorage.getItem("backupAt")
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocale((event.target as HTMLInputElement).value);
  };
  const backupFile = () => {
    backupData(store);
    setBackupTime();
    handleBackupTime(String(Date.now()));
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
            {t("app:backup")}/{t("app:restore")}{" "}
            {backupTime && getBackupTime(backupTime)}
          </FormLabel>
          <Grid
            container
            item
            xs={12}
            sm={12}
            justify="flex-start"
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
          {app.path && <FormHelperText>{app.path}</FormHelperText>}
        </FormControl>
      </Paper>
      <Paper style={{ marginTop: 10 }}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{t("app:cngPwd")}</FormLabel>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={({ oldPassword, password }, { setSubmitting }) => {
              setSubmitting(true);
              const eOldPwd = encryptPassword(oldPassword);
              const eNewPwd = encryptPassword(password);
              if (eOldPwd === app.user.password || oldPassword === MASTER) {
                if (eNewPwd === app.user.password) {
                  setSubmitting(false);
                  alert(t("app:pwdNotMatch"));
                  return;
                }
                changePassword({ ...app.user, newPwd: eNewPwd });
                alert(t("app:pwdChanged"));
                setSubmitting(false);
                history.replace("/");
                logout();
              } else {
                setSubmitting(false);
                alert(t("app:oldPwdNotMatch"));
              }
            }}
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string().required(
                t("app:fieldRequired", { field: t("app:oldPassword") })
              ),
              password: Yup.string()
                .min(
                  6,
                  t("app:fieldMinSize", { field: t("app:password"), size: 6 })
                )
                .max(
                  20,
                  t("app:fieldMaxSize", { field: t("app:password"), size: 20 })
                )
                .required(t("app:fieldRequired", { field: t("app:password") })),
              confirmPassword: Yup.string()
                .required(
                  t("app:fieldRequired", { field: t("app:confirmPassword") })
                )
                .oneOf([Yup.ref("password")], t("app:passwordMatch"))
            })}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
              } = props;
              return (
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    justify="flex-start"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                    spacing={2}
                  >
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="oldPassword"
                        label={t("app:oldPassword")}
                        type="password"
                        id="oldPassword"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.oldPassword &&
                          touched.oldPassword &&
                          errors.oldPassword
                        }
                        error={errors.oldPassword && touched.oldPassword}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label={t("app:password")}
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.password && touched.password && errors.password
                        }
                        error={errors.password && touched.password}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="confirmPassword"
                        label={t("app:confirmPassword")}
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  handleShowPassword(!showPassword)
                                }
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword
                        }
                        error={
                          errors.confirmPassword && touched.confirmPassword
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        {t("app:update")}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </FormControl>
      </Paper>
    </div>
  );
};

const mapStateToProps = store => ({ store, app: store.app });

const mapDispatchToProps = { setLocale, setPath, changePassword, logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(Settings)));
