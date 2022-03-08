import React, { useEffect, useState } from "react";
import Content from "../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getToken, setSession } from '../Utils/Common';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export function SummaryCard({ title, value, component }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={"textSecondary"} variant="h5" gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={"primary"} variant="h3">
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export default function Customer() {
  const [customer, setCustomer] = useState({})
  useEffect(() => {
    const token = getToken()

    if (!token) {
      window.location = '/login';
    }
    axios.get('http://localhost:4000/api/customer/info', {headers: {
      Authorization: `Bearer ${token}`
    }}).then(response => {
      const jsonData = response.data
      console.log(jsonData)
      setCustomer(jsonData)
      setSession(jsonData)
    })
  }, [])
  const classes = useStyles();
  const loading = false;

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  return (
    <Content>
      <div className={classes.summaryCards}>
        <SummaryCard title={"Wallet amount"} value={"$" + (customer && customer.wallet && customer.wallet.amount / 100) || 0} />
        <SummaryCard title={"Email"} value={customer.email} />
        <SummaryCard title={"First Name"} value={customer.firstName} />
        <SummaryCard title={"Last Name"} value={customer.lastName} />
        <SummaryCard title={"PayId"} value={customer && customer.wallet && customer.wallet.PayId} />
      </div>
    </Content>
  );
}
