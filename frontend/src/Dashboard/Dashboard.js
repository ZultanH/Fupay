import React from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TotalCard from "./TotalCard";
import { drawerWidth } from "../AppBarAndDrawer/AppBarAndDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content";


const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appToolbar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300,
  },
  balanceCard: {
    height: 200,
  },
}));



export function Dashboard() {
  const classes = useStyles();
  const balancePaper = clsx(classes.paper, classes.balanceCard);
  return (
    <>
      <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={8}>
            <Paper className={balancePaper}>
              <TotalCard />
            </Paper>
          </Grid>
        </Grid>
      </Content>
    </>
  );
}
