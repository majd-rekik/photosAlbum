import "./App.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import photo1 from "./photo1.jpg";
import photo2 from "./Photo2.jpg";
import photo3 from "./Photo3.jpg";
import photo4 from "./photo4.jpg";
import photo5 from "./Photo5.jpg";
import photo6 from "./Photo6.jpg";
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
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BASE_URL = "https://dummyapi.io/data/api";
const APP_ID = "5fe3cdf87b952d73bf676129";

const tableau = [
  { photo: photo1, label: "Croatia: Pula" },
  { photo: photo2, label: "France: Paris" },
  { photo: photo3, label: "Hungary: Budapest" },
  { photo: photo4, label: "Italy: Milan" },
  { photo: photo5, label: "Germany: Freiburg" },
  { photo: photo6, label: "Germany: Nuremberg" },
];
tableau.push({
  photo:
    "https://www.visitberlin.de/system/files/styles/visitberlin_bleed_header_visitberlin_mobile_1x/private/image/BraTor_Fruehling_c_visitBerlin_Foto_DagmarSchwelle%20%284%29_DL_PPT.jpg?h=e5aec6c8&itok=Fxr3t1cm",
  label: "Germany: Berlin",
});

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [photoId, setPhotoId] = useState(0);
  const [addClicked, setAddClicked] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [label, setLabel] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/user`, { headers: { "app-id": APP_ID } })
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (data) console.log(data.data);

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
  const saleh = (event) => {
    data.data.push({
      picture: urlImage,
      lastName: label,
    });
    setAddClicked(false);
    setUrlImage("");
    setLabel("");
  };
  return (
    <div className="App">
      {loading && "Loading..."}
      {data && (
        <div>
          <header className="App-header">
            <div className="majd">Data Base info </div>
          </header>
          <div
            className="content"
            style={{
              backgroundImage: `url(${data.data[photoId].picture})`,
              backgroundSize: "cover",
              overflow: "hidden",
            }}
          >
            <Card className="card">
              <CardMedia
                className="App-logo"
                image={data.data[photoId].picture}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
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
                  <form onSubmit={saleh} noValidate autoComplete="off">
                    <TextField
                      id="filled-basic"
                      label="Url image"
                      value={urlImage}
                      onChange={(event) => setUrlImage(event.target.value)}
                    />
                    <TextField
                      id="filled-basic"
                      label="firstName"
                      value={label}
                      onChange={(event) => setLabel(event.target.value)}
                    />
                    <TextField
                      id="filled-basic"
                      label="lastName"
                      value={label}
                      onChange={(event) => setLabel(event.target.value)}
                    />
                    <TextField
                      id="filled-basic"
                      label="Email"
                      value={label}
                      onChange={(event) => setLabel(event.target.value)}
                    />

                    <Button type="submit" variant="contained" color="secondary">
                      Add
                    </Button>
                  </form>
                )}
                <IconButton
                  aria-label="add to shopping cart"
                  onClick={photoNext}
                >
                  <NavigateNextIcon fontSize="large" />
                </IconButton>
              </CardActions>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                There is only one photo left
              </Alert>
            </Snackbar>
          </div>
          <footer className="App-footer">copywrites: Majd.Rekik</footer>
        </div>
      )}
    </div>
  );
};

export default App;
