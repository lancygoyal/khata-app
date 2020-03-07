import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { Grid, Theme, makeStyles, createStyles } from "@material-ui/core";
import {
  ALPHA_SPACE_DOT,
  ALPHA_SPACE,
  CONTACT_NUMBER,
  NUMERIC
} from "../../constants/regex";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%"
    },
    tabBtn: {
      width: "50%",
      borderRadius: 0,
      borderBottomStyle: "solid",
      borderBottomWidth: 5,
      borderBottomColor: theme.palette.grey[700],
      backgroundColor: theme.palette.grey[700]
    },
    tabBtnActive: {
      width: "50%",
      borderRadius: 0,
      borderBottomStyle: "solid",
      borderBottomWidth: 5,
      borderBottomColor: theme.palette.background.default,
      color: theme.palette.background.default
    },
    btn: {
      margin: "2%",
      marginTop: 20,
      width: "46%"
    }
  })
);

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 }
];

export default ({ open, handleClose }) => {
  const classes = useStyles();
  const [selectAccount, handleSelectAccount] = React.useState(null);
  const [addAccount, handleAddAccount] = React.useState(false);
  const [type, setType] = React.useState("in");
  const [invoiceNumber, setInvoiceNumber] = React.useState("00001");
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="enter-password-title"
      disableBackdropClick={true}
      maxWidth="md"
    >
      <DialogTitle id="enter-password-title">{t("app:addRecord")}</DialogTitle>
      <DialogContent style={{ maxWidth: "700px", maxHeight: "700px" }}>
        <Formik
          initialValues={{
            accountName: "",
            city: "",
            contactNumber: "",
            addInfo: "",
            amount: "",
            notes: ""
          }}
          onSubmit={(
            { accountName, city, contactNumber, addInfo, amount, notes },
            { setSubmitting }
          ) => {
            setSubmitting(true);
            handleClose();
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
              .required(
                t("app:fieldRequired", { field: t("app:accountName") })
              ),
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
                )
              }),
            contactNumber: Yup.string()
              .min(
                10,
                t("app:fieldMinSize", {
                  field: t("app:contactNumber"),
                  size: 10
                })
              )
              .max(
                16,
                t("app:fieldMaxSize", {
                  field: t("app:contactNumber"),
                  size: 16
                })
              )
              .when("addAccount", {
                is: () => addAccount,
                then: Yup.string().required(
                  t("app:fieldRequired", { field: t("app:contactNumber") })
                )
              }),
            addInfo: Yup.string()
              .min(
                10,
                t("app:fieldMinSize", { field: t("app:addInfo"), size: 10 })
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
                  size: 2
                })
              )
              .max(
                7,
                t("app:fieldMaxSize", {
                  field: t("app:amount"),
                  size: 7
                })
              )
              .required(t("app:fieldRequired", { field: t("app:amount") })),
            notes: Yup.string()
              .min(
                10,
                t("app:fieldMinSize", { field: t("app:notes"), size: 10 })
              )
              .max(
                500,
                t("app:fieldMaxSize", { field: t("app:notes"), size: 500 })
              )
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
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    justify="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={
                        type === "in" ? classes.tabBtnActive : classes.tabBtn
                      }
                      onClick={() => setType("in")}
                    >
                      {t("app:in")}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={
                        type === "out" ? classes.tabBtnActive : classes.tabBtn
                      }
                      onClick={() => setType("out")}
                    >
                      {t("app:out")}
                    </Button>
                  </Grid>
                  <Grid item xs={7} sm={7}>
                    <Autocomplete
                      id="selectAccount"
                      options={top100Films}
                      value={selectAccount}
                      onChange={(event: any, newValue) => {
                        if (newValue && newValue.inputValue) {
                          handleAddAccount(true);
                          handleSelectAccount({
                            title: t("app:addAccount")
                          });
                          handleChange({
                            target: {
                              value: newValue.inputValue,
                              name: "accountName"
                            }
                          });
                        } else {
                          handleAddAccount(false);
                          handleSelectAccount(newValue);
                          handleChange({
                            target: {
                              value: newValue === null ? "" : newValue,
                              name: "accountName"
                            }
                          });
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== "") {
                          filtered.push({
                            inputValue: params.inputValue,
                            title: `${t("app:add")} "${params.inputValue}"`
                          });
                        }

                        return filtered;
                      }}
                      getOptionLabel={option => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        return option.title;
                      }}
                      renderOption={option => option.title}
                      freeSolo
                      blurOnSelect
                      clearOnEscape
                      disableOpenOnFocus
                      disabled={addAccount}
                      renderInput={params => (
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
                    <TextField
                      name="invoiceNumber"
                      variant="outlined"
                      fullWidth
                      id="invoiceNumber"
                      value={invoiceNumber}
                      label={t("app:invoiceNumber")}
                    />
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
                          value={values.accountName}
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
                        <TextField
                          name="city"
                          variant="outlined"
                          required
                          fullWidth
                          id="city"
                          label={t("app:city")}
                          value={values.city}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.city && touched.city && errors.city
                          }
                          error={errors.city && touched.city}
                          inputProps={{ pattern: ALPHA_SPACE }}
                        />
                      </Grid>
                      <Grid item xs={4} sm={4}>
                        <TextField
                          name="contactNumber"
                          variant="outlined"
                          required
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
                  justify="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    disabled={isSubmitting}
                    onClick={handleClose}
                  >
                    {t("app:close")}
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
