import DateFnsUtils from "@date-io/date-fns";
import { createStyles, FormControlLabel, Grid, IconButton, makeStyles, Radio, RadioGroup, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Close from "@material-ui/icons/Close";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Formik } from "formik";
import Humanize from "humanize-plus";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { TYPES } from "../../constants/app";
import { ALPHA_SPACE, ALPHA_SPACE_DOT, CONTACT_NUMBER, NUMERIC } from "../../constants/regex";

const filter = createFilterOptions();
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
  invoiceNumber,
  accounts,
  cities,
  onClose,
  saveData,
  date = new Date(),
  directAdd = false,
}) => {
  const classes = useStyles();
  const [selectAccount, handleSelectAccount] = React.useState(
    directAdd ? accounts[0] : null
  );
  const [addAccount, handleAddAccount] = React.useState(false);
  const [type, setType] = React.useState(TYPES.OUT);
  const [more, setMore] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(date);
  const { t } = useTranslation();

  const reset = () => {
    !directAdd && handleSelectAccount(null);
    handleAddAccount(false);
    setType(TYPES.OUT);
  };

  return (
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
        <h2 style={{ margin: 0 }}>{t("app:addRecord")}</h2>
        <IconButton style={{ padding: 0 }} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ maxWidth: "700px", maxHeight: "700px" }}>
        <Formik
          initialValues={{
            accountName: "",
            city: "",
            contactNumber: "",
            addInfo: "",
            amount: "",
            notes: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            saveData({
              invoiceNumber,
              values,
              selectAccount,
              addAccount,
              type,
              more,
              selectedDate,
            });
            if (more) {
              setTimeout(() => {
                resetForm();
                reset();
                setSubmitting(false);
              }, 500);
            }
          }}
          validationSchema={Yup.object().shape({
            accountName: Yup.string()
              .min(
                2,
                t("app:fieldMinSize", { field: t("app:accountName"), size: 2 })
              )
              .max(
                40,
                t("app:fieldMaxSize", { field: t("app:accountName"), size: 40 })
              )
              .when("directAdd", {
                is: () => !directAdd,
                then: Yup.string().required(
                  t("app:fieldRequired", { field: t("app:accountName") })
                ),
              }),
            city: Yup.string()
              .min(2, t("app:fieldMinSize", { field: t("app:city"), size: 2 }))
              .max(
                30,
                t("app:fieldMaxSize", { field: t("app:city"), size: 30 })
              )
              .when("addAccount", {
                is: () => addAccount,
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
            amount: Yup.string()
              .min(
                2,
                t("app:fieldMinSize", {
                  field: t("app:amount"),
                  size: 2,
                })
              )
              .max(
                7,
                t("app:fieldMaxSize", {
                  field: t("app:amount"),
                  size: 7,
                })
              )
              .required(t("app:fieldRequired", { field: t("app:amount") })),
            notes: Yup.string()
              .min(2, t("app:fieldMinSize", { field: t("app:notes"), size: 2 }))
              .max(
                500,
                t("app:fieldMaxSize", { field: t("app:notes"), size: 500 })
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
              resetForm,
              handleSubmit,
            } = props;

            const handleInputChange = (evt) => {
              const { value = "", pattern = "" } = evt.target;
              pattern && value
                ? RegExp(pattern).test(value) && handleChange(evt)
                : handleChange(evt);
            };

            const handleResetForm = () => {
              resetForm();
              reset();
            };

            const handleSave = (evt, flag = false) => {
              setMore(flag);
              handleSubmit(evt);
            };

            return (
              <form className={classes.form} noValidate onSubmit={(evt) => handleSave(evt, false)}>
                <Grid container spacing={2}>
                  <Grid item xs={7} sm={7}>
                    <Autocomplete
                      id="selectAccount"
                      options={accounts}
                      value={selectAccount}
                      onChange={(event: any, newValue) => {
                        if (newValue && newValue.inputValue) {
                          handleAddAccount(true);
                          handleSelectAccount({
                            inputValue: newValue.inputValue,
                            accountName: t("app:addAccount"),
                          });
                          handleChange({
                            target: {
                              value: newValue.inputValue,
                              name: "accountName",
                            },
                          });
                        } else {
                          if (typeof newValue === "string") {
                            return;
                          }
                          handleAddAccount(false);
                          handleSelectAccount(newValue);
                          handleChange({
                            target: {
                              value:
                                newValue === null ? "" : newValue.accountName,
                              name: "accountName",
                            },
                          });
                        }
                      }}
                      onBlur={handleBlur}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== "") {
                          filtered.push({
                            inputValue: params.inputValue,
                            accountName: `${t("app:add")} "${
                              params.inputValue
                              }"`,
                          });
                        }

                        return filtered;
                      }}
                      getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option.inputValue) {
                          return option.accountName;
                        }
                        return Humanize.capitalizeAll(
                          `${option.accountName}, ${option.city}`
                        );
                      }}
                      renderOption={(option) =>
                        option.inputValue
                          ? option.accountName
                          : Humanize.capitalizeAll(
                            `${option.accountName}, ${option.city}`
                          )
                      }
                      freeSolo
                      blurOnSelect
                      clearOnEscape
                      autoHighlight
                      autoSelect
                      disabled={directAdd || addAccount}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          autoFocus
                          label={t("app:selectAccount")}
                          variant="outlined"
                          fullWidth
                          required
                          helperText={
                            !addAccount &&
                            errors.accountName &&
                            touched.accountName &&
                            errors.accountName
                          }
                          error={
                            !addAccount &&
                            errors.accountName &&
                            touched.accountName
                          }
                          disabled={addAccount}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={5} sm={5}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        variant="inline"
                        inputVariant="outlined"
                        id="add-dialoge-date-picker"
                        format="dd-MM-yyyy"
                        value={selectedDate}
                        animateYearScrolling
                        autoOk
                        onChange={setSelectedDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  {addAccount && (
                    <>
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.addInfo && touched.addInfo && errors.addInfo
                          }
                          error={errors.addInfo && touched.addInfo}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={4} sm={4}>
                    <TextField
                      name="amount"
                      variant="outlined"
                      required
                      fullWidth
                      id="amount"
                      label={t("app:amount")}
                      value={values.amount}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.amount && touched.amount && errors.amount
                      }
                      error={errors.amount && touched.amount}
                      inputProps={{ pattern: NUMERIC }}
                    />
                  </Grid>
                  <Grid item xs={8} sm={8}>
                    <TextField
                      name="notes"
                      id="notes"
                      label={t("app:notes")}
                      multiline
                      required={false}
                      fullWidth
                      rows="3"
                      variant="outlined"
                      value={values.notes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.notes && touched.notes && errors.notes}
                      error={errors.notes && touched.notes}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  alignItems="center"
                  justify="flex-end"
                >
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    row
                  >
                    <FormControlLabel
                      value={TYPES.IN}
                      control={<Radio />}
                      label={t("app:in")}
                    />
                    <FormControlLabel
                      value={TYPES.OUT}
                      control={<Radio />}
                      label={t("app:out")}
                    />
                  </RadioGroup>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  justify="flex-end"
                  alignItems="center"
                >
                  {!directAdd && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btn}
                      disabled={isSubmitting}
                      onClick={handleResetForm}
                    >
                      {t("app:reset")}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    disabled={isSubmitting}
                    onClick={(evt) => handleSave(evt, true)}
                  >
                    {t("app:saveMore")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    disabled={isSubmitting}
                  >
                    {t("app:save")}
                  </Button>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
