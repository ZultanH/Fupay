import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
import moment from "moment";
import { getCustomer, getToken, removeCustomerSession } from '../Utils/Common'
import axios from 'axios'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  balance: {
    display: "flex",
  },
  balanceItem: {
    marginRight: "40px",
  },
});

export default function Deposits() {
  const classes = useStyles();
  const customer = getCustomer()
  const currentTotal = customer && customer.wallet && customer.wallet.amount ? customer.wallet.amount / 100 : 0
  const [total, setTotal] = useState(currentTotal)
  
  const handleBalanceRefresh = () => {
    const apiToken = getToken()
    axios.get('http://localhost:4000/api/customer/info', {
      headers: {'Authorization': `Bearer ${apiToken}`}
    }).then(response => {
      const latestBalance = response.data && response.data.wallet ? response.data.wallet.amount : 0
      setTotal(latestBalance / 100)
    })
  }
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you wish to logout?')) {
      window.flash('Logging out...')
      setTimeout(() => {
        removeCustomerSession()
        window.location = '/login'
      }, 4000)
    }
  }

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <Title>Balance</Title>

        <Button
          edge="end"
          variant="outlined"
          color="primary"
          onClick={() => {
            window.location = '/update'
          }}
        >
          Add funds
        </Button>

        <Button
          edge="end"
          variant="outlined"
          color="primary"
          onClick={handleBalanceRefresh}
        >
          Refresh Balance
        </Button>

        <Button
          edge="end"
          variant="outlined"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className={classes.balance}>
        <div className={classes.balanceItem}>
          <Typography component="p" variant="h3">
            ${total.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            {format(moment().valueOf(), "MMMM do, y")}
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
}
