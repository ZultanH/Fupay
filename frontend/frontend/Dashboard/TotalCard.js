import React, { useContext, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { DataContext } from "../Providers/DataProvider";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import { format } from "date-fns";
import moment from "moment";
import { getCustomer, getToken } from '../Utils/Common'

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
  const [customer, setCustomer] = useState(getCustomer())
  const { addRandomExpense } = useContext(DataContext);

  const handleBalanceRefresh = () => {
    const apiToken = getToken()

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
            addRandomExpense();
          }}
        >
          Add funds
        </Button>

        <Button
          edge="end"
          variant="outlined"
          color="primary"
          onClick={() => {
            addRandomExpense();
          }}
        >
          Refresh Balance
        </Button>
      </div>
      <div className={classes.balance}>
        <div className={classes.balanceItem}>
          <Typography component="p" variant="h3">
            ${customer.wallet.amount.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            {format(moment().valueOf(), "MMMM do, y")}
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
}
