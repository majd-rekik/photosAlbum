import "./../App.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useState, useEffect } from "react";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "5fe3cdf87b952d73bf676129";

function Card1(){
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [photoId, setPhotoId] = useState(0);
  const [addClicked, setAddClicked] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/user`, { headers: { "app-id": APP_ID } })
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /*if (data) console.log(data.data);*/

  const photoBefor = (event) => {
    if (data) {
      if (photoId === 0) {
        setPhotoId(data.data.length - 1);
      } else {
        setPhotoId(photoId - 1);
      }
    }
  };
  const photoNext = (event) => {
    if (data) {
      if (photoId === data.data.length - 1) {
        setPhotoId(0);
      } else {
        setPhotoId(photoId + 1);
      }
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const photoAdd = (event) => {
    setAddClicked(true);
  };
  const photoSup = (event) => {
    if (data.data.length !== 1) {
      data.data.splice(photoId, 1);
      photoBefor();
    } else {
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const sub = (event) => {
    data.data.push({
      picture: urlImage,
      firstName: firstName,
      lastName: lastName,
      email: email,
      title: title,
    });
    setAddClicked(false);
    setUrlImage("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setTitle("");
  };
  return (
    <div className="card">
      {loading && "Loading..."}
      {data && (
        <Card>
          <CardMedia className="App-logo" image={data.data[photoId].picture} />
          <CardContent className="">
            <Typography className="typo1" gutterBottom variant="h5" component="h2">
              <strong>{`Title: `}</strong>
              {data.data[photoId].title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{`First Name: `}</strong>
              {data.data[photoId].firstName}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{`Last Name: `}</strong>
              {data.data[photoId].lastName}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{`Email: `}</strong>
              {data.data[photoId].email}
            </Typography>
          </CardContent>
          <CardActions className="Befor">
            <IconButton onClick={photoBefor} aria-label="add an alarm">
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
            {addClicked === false && (
              <div>
                <IconButton
                  onClick={photoAdd}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AddToPhotosIcon fontSize="large" />
                </IconButton>
                <IconButton color="secondary" onClick={photoSup}>
                  <HighlightOffIcon fontSize="large" />
                </IconButton>
              </div>
            )}
            {addClicked === true && (
              <form onSubmit={sub} noValidate autoComplete="off">
                <TextField
                  id="filled-basic"
                  label="Url image"
                  value={urlImage}
                  onChange={(event) => setUrlImage(event.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="firstname"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="lastname"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <FormControl>
                  <InputLabel id="select-title">Title</InputLabel>
                  <Select
                    labelId="select-title"
                    id="select-title"
                    value={title}
                    onChange={handleChange}
                  >
                    <MenuItem value={"mr"}>mr</MenuItem>
                    <MenuItem value={"miss"}>miss</MenuItem>
                    <MenuItem value={"ms"}>ms</MenuItem>
                    <MenuItem value={"mrs"}>mrs</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="secondary">
                  Add
                </Button>
              </form>
            )}
            <IconButton aria-label="add to shopping cart" onClick={photoNext}>
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          </CardActions>
        </Card>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          There is only one photo left
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Card1;
