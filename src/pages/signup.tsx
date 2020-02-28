import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { createAccount } from "../redux/users";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { encryptPassword } from "../utils/common";
import { ALPHA_SPACE_DOT } from "../constants/regex";

const styles = theme =>
  createStyles({
    paper: {
      marginTop: theme.spacing(9),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  });

interface SignUpProps
  extends WithStyles,
    WithTranslation,
    StateProps,
    DispatchProps {
  history: any;
}

interface SignUpState {
  showPassword: boolean;
}

class SignUp extends React.Component<SignUpProps, SignUpState> {
  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    this.setState(({ showPassword }) => ({
      showPassword: !showPassword
    }));
  };

  render() {
    const { classes, history, t, createAccount } = this.props;
    const { showPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("app:setupFirm")}
          </Typography>
          <Formik
            initialValues={{
              firmName: "",
              firstName: "",
              lastName: "",
              password: "",
              confirmPassword: ""
            }}
            onSubmit={(
              { firmName, firstName, lastName, password },
              { setSubmitting }
            ) => {
              setSubmitting(true);
              createAccount({
                firmName,
                firstName,
                lastName,
                password: encryptPassword(password),
                isMaster: true,
                createdAt: Date.now()
              });
              history.replace("/");
            }}
            validationSchema={Yup.object().shape({
              firmName: Yup.string()
                .min(
                  2,
                  t("app:fieldMinSize", { field: t("app:firmName"), size: 2 })
                )
                .max(
                  40,
                  t("app:fieldMaxSize", { field: t("app:firmName"), size: 40 })
                )
                .required(t("app:fieldRequired", { field: t("app:firmName") })),
              firstName: Yup.string()
                .min(
                  2,
                  t("app:fieldMinSize", { field: t("app:firstName"), size: 2 })
                )
                .max(
                  20,
                  t("app:fieldMaxSize", { field: t("app:firstName"), size: 20 })
                )
                .required(
                  t("app:fieldRequired", { field: t("app:firstName") })
                ),
              lastName: Yup.string()
                .min(
                  2,
                  t("app:fieldMinSize", { field: t("app:lastName"), size: 2 })
                )
                .max(
                  20,
                  t("app:fieldMaxSize", { field: t("app:lastName"), size: 20 })
                )
                .required(t("app:fieldRequired", { field: t("app:lastName") })),
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

              const handleInputChange = evt => {
                const { value = "", pattern = "" } = evt.target;
                pattern && value
                  ? RegExp(pattern).test(value) && handleChange(evt)
                  : handleChange(evt);
              };

              return (
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="firmName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firmName"
                        label={t("app:firmName")}
                        value={values.firmName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.firmName && touched.firmName && errors.firmName
                        }
                        error={errors.firmName && touched.firmName}
                        inputProps={{ pattern: ALPHA_SPACE_DOT }}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label={t("app:firstName")}
                        value={values.firstName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.firstName &&
                          touched.firstName &&
                          errors.firstName
                        }
                        error={errors.firstName && touched.firstName}
                        inputProps={{ pattern: ALPHA_SPACE_DOT }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        name="lastName"
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label={t("app:lastName")}
                        value={values.lastName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.lastName && touched.lastName && errors.lastName
                        }
                        error={errors.lastName && touched.lastName}
                        inputProps={{ pattern: ALPHA_SPACE_DOT }}
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                                onClick={this.handleClickShowPassword}
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
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >
                    {t("app:createAccount")}
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { createAccount };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTranslation()(SignUp)));
