import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editSingleUser } from "./singleUserSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
const EditUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
const {id} = useParams()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editSingleUser(id , username));
    navigate("/");
  };

  return (
    <div>
        
      <div>
        <form onSubmit={handleSubmit}>
          <h2> Edit your profile information below: </h2>
          <div>
          <div>
            <label htmlFor="Username"></label>
            <InputProps
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
            <Button type="submit" disabled variant = "contained" color = "primary">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
