import "./../App.css";
import React, {  useState } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Card1(props){
  const [photoId, setPhotoId] = useState(0);
  const [open, setOpen] = useState(false);
  /*if (data) console.log(data.data);*/

  const photoBefor = (event) => {
    if (props.data) {
      if (photoId === 0) {
        setPhotoId(props.data.data.length - 1);
      } else {
        setPhotoId(photoId - 1);
      }
    }
  };
  const photoNext = (event) => {
    if (props.data) {
      if (photoId === props.data.data.length - 1) {
        setPhotoId(0);
      } else {
        setPhotoId(photoId + 1);
      }
    }
  };
  const photoSup = (event) => {
    if (props.data.data.length !== 1) {
      props.data.data.splice(photoId, 1);
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
  
  return (
    <div className="card">
      {props.loading && "Loading..."}
      {props.data && (
        <Card>
          <CardMedia className="App-logo" image={props.data.data[photoId].picture} />
          <CardContent>
            <Typography className="typo1" gutterBottom variant="h5" component="h2">
              <strong>{`Title: `}</strong>
              {props.data.data[photoId].title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{`First Name: `}</strong>
              {props.data.data[photoId].firstName}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{`Last Name: `}</strong>
              {props.data.data[photoId].lastName}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{`Email: `}</strong>
              {props.data.data[photoId].email}
            </Typography>
          </CardContent>
          <CardActions className="Befor">
            <IconButton onClick={photoBefor} aria-label="add an alarm">
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
                <IconButton color="secondary" onClick={photoSup}>
                  <HighlightOffIcon fontSize="large" />
                </IconButton>
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
