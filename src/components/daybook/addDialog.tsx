import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Theme, makeStyles, createStyles } from "@material-ui/core";
import { ALPHA_SPACE_DOT } from "../../constants/regex";

const useStyles = makeStyles((theme: Theme) =>
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
  })
);

export default ({ open, handleClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="enter-password-title"
      disableBackdropClick={true}
      fullScreen={false}
    >
      <DialogTitle id="enter-password-title">{t("app:addRecord")}</DialogTitle>
      <DialogContent style={{ width: "400px" }}>
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
              .required(t("app:fieldRequired", { field: t("app:firstName") })),
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
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label={t("app:city")}
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="lastName"
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label={t("app:contactNumber")}
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      name="addDetails"
                      id="addDetails"
                      label={t("app:addDetails")}
                      multiline
                      fullWidth
                      rows="3"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  onClick={handleClose}
                >
                  {t("app:close")}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  onClick={handleClose}
                >
                  {t("app:save")}
                </Button>
              </form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
