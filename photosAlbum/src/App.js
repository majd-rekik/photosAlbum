import "./App.css";
import Card from "./component/Card";
import AddNewUser from "./component/AddNewUser";
import Resume from "./component/Resume";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "5fe3cdf87b952d73bf676129";

const useStyles = makeStyles((theme) => ({
  footer: {
    textJustify: "center",
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const App = () => {
  const [add, setAdd] = useState(1);
  const classes = useStyles();
  const [loading, setLoading] = useState (false);
    const [data, setData] = useState (null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/user`, { headers: { "app-id": APP_ID } })
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const listOfCardHandler = (event) => {
    setAdd(3);
  };
  const toCardHandler = (event) => {
    setAdd(1);
  };
  const addAboutUs = (event) => {
    setAdd(2);
  };



  return (
    <div className="App">
      <div>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className="toolbar">
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              Users Info
            </Typography>
            <nav>
              <Link
                variant="button"
                color="textPrimary"
                className={classes.link}
                onClick={toCardHandler}
              >
                Card
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                onClick={listOfCardHandler}
                className={classes.link}
              >
                Add New User
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                onClick={addAboutUs}
                className={classes.link}
              >
                About Us
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
        <div
          className="content"
          style={{
            /*backgroundImage: `url(${data.data[photoId].picture})`,*/
            backgroundSize: "cover",
            overflow: "hidden",
          }}
        >
          {add === 1 && <Card data={data} loading= {loading}/>}
          {add === 2 && <Resume/>}
          {add === 3 && <AddNewUser data={data} loading= {loading} />}
        </div>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">copywrite: Majd Rekik</Typography>
          </Container>
        </footer>
      </div>
    </div>
  );
};
export default App;