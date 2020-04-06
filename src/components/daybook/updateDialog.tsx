import DateFnsUtils from "@date-io/date-fns";
import {
  createStyles,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Close from "@material-ui/icons/Close";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Formik } from "formik";
import Humanize from "humanize-plus";
import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { TYPES } from "../../constants/app";
import { NUMERIC } from "../../constants/regex";

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
  accountName = "",
  amount = "",
  notes = "",
  invType = TYPES.OUT,
  onClose,
  saveData,
  date = new Date(),
}) => {
  const classes = useStyles();
  const [type, setType] = React.useState(invType);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(date);
  const { t } = useTranslation();

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
        <h2 style={{ margin: 0 }}>{t("app:ledger")} {t("app:editInvoice")}</h2>
        <IconButton style={{ padding: 0 }} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ maxWidth: "700px", maxHeight: "700px" }}>
        <Formik
          initialValues={{
            accountName: accountName,
            amount: amount,
            notes: notes,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            saveData({
              invoiceNumber,
              values,
              type,
              selectedDate,
            });
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
                is: () => false,
                then: Yup.string().required(
                  t("app:fieldRequired", { field: t("app:accountName") })
                ),
              }),
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
              handleSubmit,
            } = props;

            const handleInputChange = (evt) => {
              const { value = "", pattern = "" } = evt.target;
              pattern && value
                ? RegExp(pattern).test(value) && handleChange(evt)
                : handleChange(evt);
            };

            return (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={7} sm={7}>
                    <TextField
                      name="accountName"
                      variant="outlined"
                      required
                      fullWidth
                      id="accountName"
                      label={t("app:accountName")}
                      value={Humanize.capitalizeAll(values.accountName)}
                    />
                  </Grid>
                  <Grid item xs={5} sm={5}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        variant="inline"
                        inputVariant="outlined"
                        id="add-dialoge-date-picker"
                        format="dd, MMMM yyyy"
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
                  <Grid item xs={4} sm={4}>
                    <TextField
                      name="amount"
                      variant="outlined"
                      required
                      fullWidth
                      autoFocus
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
                      value={TYPES.OUT}
                      control={<Radio />}
                      label={t("app:out")}
                    />
                    <FormControlLabel
                      value={TYPES.IN}
                      control={<Radio />}
                      label={t("app:in")}
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    disabled={isSubmitting}
                  >
                    {t("app:editInvoice")}
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
