import {
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Close from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Formik } from "formik";
import Humanize from "humanize-plus";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import {
  ALPHA_SPACE,
  ALPHA_SPACE_DOT,
  CONTACT_NUMBER,
} from "../../constants/regex";
import Confirm from "../confirm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    form: {
      width: "100%",
    },
    tabBtn: {
      width: "50%",
      borderRadius: 0,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.dark,
    },
    tabBtnActive: {
      width: "50%",
      borderRadius: 0,
      color: theme.palette.background.default,
      backgroundColor: "#1976d2",
    },
    btn: {
      marginBottom: "2%",
      marginLeft: "2%",
      marginTop: 20,
      width: "25%",
    },
  })
);

export default ({
  open,
  accountName = "",
  city = "",
  contactNumber = "",
  addInfo = "",
  cities,
  onClose,
  saveData,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [shouldUpdate, handleConfirm] = React.useState(null);
  const [isTouched, setTouched] = React.useState(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="enter-password-title"
        disableBackdropClick={true}
        maxWidth="md"
      >
        <DialogTitle
          id="enter-password-title"
          disableTypography
          className={classes.dialogTitle}
        >
          <h2 style={{ margin: 0 }}>
            {t("app:edit")} {t("app:account")}
          </h2>
          <IconButton style={{ padding: 0 }} onClick={onClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ maxWidth: "700px", maxHeight: "700px" }}>
          <Formik
            initialValues={{
              accountName: accountName,
              city: city,
              contactNumber: contactNumber,
              addInfo: addInfo,
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (isTouched) {
                setSubmitting(true);
                handleConfirm({ ...values });
                setSubmitting(false);
              } else onClose();
            }}
            validationSchema={Yup.object().shape({
              accountName: Yup.string()
                .min(
                  2,
                  t("app:fieldMinSize", {
                    field: t("app:accountName"),
                    size: 2,
                  })
                )
                .max(
                  40,
                  t("app:fieldMaxSize", {
                    field: t("app:accountName"),
                    size: 40,
                  })
                )
                .when("directAdd", {
                  is: () => true,
                  then: Yup.string().required(
                    t("app:fieldRequired", { field: t("app:accountName") })
                  ),
                }),
              city: Yup.string()
                .min(
                  2,
                  t("app:fieldMinSize", { field: t("app:city"), size: 2 })
                )
                .max(
                  30,
                  t("app:fieldMaxSize", { field: t("app:city"), size: 30 })
                )
                .when("addAccount", {
                  is: () => true,
                  then: Yup.string().required(
                    t("app:fieldRequired", { field: t("app:city") })
                  ),
                }),
              contactNumber: Yup.string()
                .min(
                  10,
                  t("app:fieldMinSize", {
                    field: t("app:contactNumber"),
                    size: 10,
                  })
                )
                .max(
                  16,
                  t("app:fieldMaxSize", {
                    field: t("app:contactNumber"),
                    size: 16,
                  })
                ),
              addInfo: Yup.string()
                .min(
                  2,
                  t("app:fieldMinSize", { field: t("app:addInfo"), size: 2 })
                )
                .max(
                  500,
                  t("app:fieldMaxSize", { field: t("app:addInfo"), size: 500 })
                ),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;

              const handleInputChange = (evt) => {
                const { value = "", pattern = "" } = evt.target;
                pattern && value
                  ? RegExp(pattern).test(value) && handleChange(evt)
                  : handleChange(evt);
                setTouched(true);
              };

              return (
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={7} sm={7}>
                      <TextField
                        name="accountName"
                        variant="outlined"
                        autoFocus
                        required
                        fullWidth
                        id="accountName"
                        label={t("app:accountName")}
                        value={Humanize.capitalizeAll(values.accountName)}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.accountName &&
                          touched.accountName &&
                          errors.accountName
                        }
                        error={errors.accountName && touched.accountName}
                        inputProps={{ pattern: ALPHA_SPACE_DOT }}
                      />
                    </Grid>
                    <Grid item xs={5} sm={5}>
                      <Autocomplete
                        id="city"
                        options={cities}
                        freeSolo
                        blurOnSelect
                        clearOnEscape
                        autoHighlight
                        autoSelect
                        getOptionLabel={(option) =>
                          Humanize.capitalizeAll(option)
                        }
                        value={values.city}
                        onChange={(event, newValue) => {
                          handleInputChange({
                            target: {
                              value: newValue ? newValue : "",
                              name: "city",
                              pattern: ALPHA_SPACE,
                            },
                          });
                        }}
                        onBlur={handleBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("app:city")}
                            variant="outlined"
                            required
                            fullWidth
                            helperText={
                              errors.city && touched.city && errors.city
                            }
                            error={errors.city && touched.city}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <TextField
                        name="contactNumber"
                        variant="outlined"
                        fullWidth
                        id="contactNumber"
                        label={t("app:contactNumber")}
                        value={values.contactNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.contactNumber &&
                          touched.contactNumber &&
                          errors.contactNumber
                        }
                        error={errors.contactNumber && touched.contactNumber}
                        inputProps={{ pattern: CONTACT_NUMBER }}
                      />
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <TextField
                        name="addInfo"
                        id="addInfo"
                        label={t("app:addInfo")}
                        multiline
                        required={false}
                        fullWidth
                        rows="3"
                        variant="outlined"
                        value={values.addInfo}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.addInfo && touched.addInfo && errors.addInfo
                        }
                        error={errors.addInfo && touched.addInfo}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.btn}
                      disabled={isSubmitting}
                    >
                      {t("app:edit")}
                    </Button>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
      <Confirm
        key={"confirm-update-account-dialog-" + Boolean(shouldUpdate)}
        open={Boolean(shouldUpdate)}
        handlePrimary={() => {
          const data = { ...shouldUpdate };
          handleConfirm(null);
          saveData(data);
        }}
        handleSecondary={() => handleConfirm(null)}
        title={t("app:edit")}
        desc={t("app:sureUpdate")}
        primaryBtnTxt={t("app:yes")}
        secondaryBtnTxt={t("app:no")}
      />
    </>
  );
};
