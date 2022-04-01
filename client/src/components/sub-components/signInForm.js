import React, { useState } from "react";
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function SignInForm() {
    const [user, setUser] = useState({email: '', password: ''})
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
            'http://localhost:4000/AlbumY/sign',
            {user})
            .then(response => {
                if (response.status === 200){
                    // console.log('status sign in is OK', response.data);
                    const path = `/AlbumY/${response.data}/`
                    console.log('navigating to...',path);
                    navigate(path)
                }
            })
            .catch(err => {console.log('was not able to sign in the user');})
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
          fullWidth
          id="outlined-required"
          name="email"
          value={user.email}
          label="Email Address"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="outlined-password-input"
          name="password"
          value={user.password}
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Button variant="contained" color="secondary" type="submit">Sign In</Button>
      </div>
    </Box>
  );
}