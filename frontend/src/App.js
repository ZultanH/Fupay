import React from "react";
import AppBarAndDrawer from "./AppBarAndDrawer/AppBarAndDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignIn } from "./SignIn";
import { SignUp } from './Signup';
import { Dashboard } from "./Dashboard/Dashboard";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "./theme";
import {Flash} from './Components/Flash';
import Bus from './Utils/Bus'
import Customer from "./People/Customer";
import UpdateWallet from './UpdateWallet'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function App() {
  const [currentTheme, setCurrentTheme] = useTheme();

  window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Flash />
        <ThemeProvider theme={currentTheme}>
              <Router>
                <div>
                  <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                  />
                  {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                  <Switch>
                    <Route path="/login">
                      <SignIn />
                    </Route>
                    <Route path="/profile">
                      <Customer />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path={'/signup'}>
                      <SignUp />
                    </Route>
                    <Route path={'/update'}>
                      <UpdateWallet />  
                    </Route>
                    <Route path="/">
                      <SignIn />
                    </Route>
                  </Switch>
                </div>
              </Router>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}
