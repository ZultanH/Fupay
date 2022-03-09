import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { getToken } from './Utils/Common'

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    paper: {
      margin: theme.spacing(8, 8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function UpdateWallet() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const useFormInput = initialValue => {
      const [value, setValue] = useState(initialValue);
     
      const handleChange = e => {
        setValue(e.target.value);
      }
      return {
        value,
        onChange: handleChange
      }
    }
  
    const amount = useFormInput('')
    const paymentMethod = useFormInput('')
  
    const handleSubmit = async () => {
      if (!window.confirm("Are you sure?")) {
        return
      }
      setError(null);
      setLoading(true);
      const token = getToken()
      axios.post('http://localhost:4000/api/wallet/update', {
        amount: amount.value,
        paymentMethod: paymentMethod.value,
      },  {headers: {Authorization: `Bearer ${token}`}}).then(response => {
        setLoading(false);
        if (response.data.success) {
          setTimeout(() => {
            window.location = '/dashboard'
          }, 3000)
        }
      }).catch(error => {
        setLoading(false);
        if (error.response.status === 400)
          setError(error.response.data.message)
      })
    }
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid container justify="center" className={classes.image}>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            direction="row"
            elevation={6}
            square
          >
            <Grid className={classes.paper}>
              <Typography component="h1" variant="h5">
                Update Wallet
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="amount"
                  label="Deposit Amount"
                  id="amount"
                  {...amount}
                />
               <InputLabel id="payment-method-select-label">Payment Method</InputLabel>
               <Select
                  labelId="payment-method-select-label"
                  id="payment-method-select"
                  label="Payment Method"
                  style={{minWidth: 150}}
                  {...paymentMethod}
                >
                  <MenuItem value={"BankAccount"}>Bank Account</MenuItem>
                  <MenuItem value={"DirectDeposit"}>Direct Deposit</MenuItem>
                </Select>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? 'Loading...' : 'Submit'}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}
