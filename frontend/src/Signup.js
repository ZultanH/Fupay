import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(img/wallpaper2-min.PNG)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
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


export function SignUp() {
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

  const email = useFormInput('')
  const password = useFormInput('')
  const firstName = useFormInput('')
  const lastName = useFormInput('')

  const handleSignup = async () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/api/auth/signup', { 
        email: email.value, 
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
    }).then(response => {
      setLoading(false);
      if (response.data.success) {
        window.flash('Successfully created account!')
        setTimeout(() => {
            window.location = '/login'
        }, 4000)
      }
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 400)
        window.flash('Error creating account!', 'error')
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
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled={loading}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled={loading}
                name="firstname"
                label="First name"
                id="firstname"
                {...firstName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled={loading}
                name="lastname"
                label="Last name"
                id="lastname"
                {...lastName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled={loading}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...password}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
                onClick={handleSignup}
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
