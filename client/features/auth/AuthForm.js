import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Box, Button, TextField } from "@mui/material";


const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <Box
          sx={{
            ml: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 15,
          }}
        >
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <Box
              sx={{
                backgroundColor: "#e8dcc8",
                borderRadius: 3,
                opacity: 0.83,
              }}
            >
              <TextField name="username" type="text" variant="standard" />
            </Box>
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <Box
              sx={{
                backgroundColor: "#e8dcc8",
                borderRadius: 3,
                opacity: 0.83,
              }}
            >
              <TextField name="password" type="password" variant="standard" />
            </Box>
          </div>
          <div>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ color: "white", mt: 3 }}
            >
              {displayName}{" "}
            </Button>
          </div>
        </Box>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
