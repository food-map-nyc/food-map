import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { deleteSingleUser } from "./userSlice";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDelete = (userId) => {
    dispatch(deleteSingleUser(userId))
  };

return (
    <div className = "container">
            {allUsers
              .map((user, idx) => (
                <div key={idx} >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent className="user">
                    <Avatar src={user.imageUrl} />
                      <h3>
                        {user.username}
                      </h3>
                    </CardContent>
                    <CardActions>
                      <Button size="large" onClick={() => navigate(`/users/${user.id}`)}>More Info</Button>
                      <Button><DeleteIcon fontSize="large" onClick = {() => {handleDelete(user.id)}}/></Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
          </div>
      )
  };

export default AllUsers;
