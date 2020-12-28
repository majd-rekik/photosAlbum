import React, {  useState } from "react";
import "./../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";


function AddNewUser(props) {
    const [firstName, setFirstName] = useState ("");
    const [lastName, setLastName] = useState ("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [urlImage, setUrlImage] = useState("");
    

   

      const handleChange = (event) => {
        setTitle(event.target.value);
      };

    const sub = (event) => {
        props.data.data.push({
          picture: urlImage,
          firstName: firstName,
          lastName: lastName,
          email: email,
          title: title,
        });
        setUrlImage("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setTitle("");
      };

   
    return (
      <div>
          {props.loading && "Loading..."}
      {props.data && (
          <Card className="UserCard">
              <Typography gutterBottom variant="h5" component="h2">
              <strong>{`New User: `}</strong>
            </Typography>
            <form onSubmit={sub} noValidate autoComplete="off" className="addcard">
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
                   <TextField
                  id="filled-basic"
                  label="Url image"
                  value={urlImage}
                  onChange={(event) => setUrlImage(event.target.value)}
                />
                <Button type="submit" variant="contained" color="secondary">
                  Add
                </Button>
            </form>
            </Card>
            )}
    
        </div>
    );
  };
export default AddNewUser;
