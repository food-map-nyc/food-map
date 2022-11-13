import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editSingleUser } from "./singleUserSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Title } from "@mui/icons-material";
const EditUser = (user) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
const {id} = useParams()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [cuisine, setcuisine] = useState("")
  const [zipcode, setZipcode] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editSingleUser(user.id, {username, email,phone,imageUrl,cuisine,zipcode}));
    navigate("/");
  };

  return (
    <Card>
<h2> Edit your profile</h2>
<form onSubmit={handleSubmit}>
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
       <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
         New Username
        </InputLabel>
        <Input
          id={id}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          label="Username"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
         New email address 
        </InputLabel>
        <Input
          id={id}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          placeholder="john@example.com"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
         <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
         New Phone Number 
        </InputLabel>
        <Input
          id={id}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          value={phone}
          placeholder="1233211234"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
         New Profile Picture
        </InputLabel>
        <Input
          id={id}
          onChange={(e) => setImageUrl(e.target.value)}
          name="phone"
          value={imageUrl}
          placeholder="paste url"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl  variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
         Update your zipcode
        </InputLabel>
        <Input
          id={id}
          onChange={(e) => setZipcode(e.target.value)}
          name="zipcode"
          value={zipcode}
          placeholder="10001"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl  variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
         update cuisine choice
        </InputLabel>
        <Input
          id={id}
          onChange={(e) => setcuisine(e.target.value)}
          name="cuisine"
          value={cuisine}
          placeholder="american"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <div>
            <Button type="submit" color = "primary">Submit</Button>
          </div>
        {/* <form onSubmit={handleSubmit}>
          <h2> Edit your profile information below: </h2>
          <div>
          <div>
            <label htmlFor="Username"></label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
              placeholder="username"
             />
          </div>
          </div>
          <div>
            <label htmlFor="email"></label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              placeholder="email"
            />
          </div>
          <div>
            <label htmlFor="phone"></label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              value={phone}
              placeholder="phone number ..."
              />
          </div>
          <div>
            <Button type="submit" color = "primary">Submit</Button>
          </div>
        </form>
      </div> */}
      </Box>
      </form>
      </Card>
      // </form>

  );
};

export default EditUser;
