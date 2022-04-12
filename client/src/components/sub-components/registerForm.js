import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RegisterForm() {
  const [user, setUser] = useState({fname:'', lname:'', email: '', password: ''})
  const navigate = useNavigate()

  function handleChange(event){
      const {name, value} = event.target
      setUser(prevVal => {
          return {
              ...prevVal,
               [name]: value
              }
          })
  }
  function handleSubmit(e){
    e.preventDefault()
    axios.post(
        'http://localhost:4000/AlbumY/register',
        {user})
        .then(response => {
            if (response.status === 200){
                console.log('status sign in is OK', response.data);
                const path = `/AlbumY/${response.data._id}/`
                console.log('navigating to...',path);
                navigate(path)
            }
        })
        .catch(err => {console.log('was not able to register in the user');})
}
  return (
    <Box onSubmit={handleSubmit}
      component="form"
      sx={{
        "& .MuiTextField-root": { flexGrow: 1, m: 1, maxWidth: "30%" }
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>one</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>two</Item>
        </Grid>
      </Grid>
      <div>
        <TextField
          required
          id="fName"
          name="fname"
          value={user.fname}
          label="First Name"
          onChange={handleChange}
        />
        <TextField
          required
          id="lName"
          name="lname"
          value={user.lname}
          label="Last Name"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          value={user.email}
          label="Email Address"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="password"
          name="password"
          value={user.password}
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Button variant="contained" color="secondary" type="submit">Register</Button>
      </div>
    </Box>
  );
}