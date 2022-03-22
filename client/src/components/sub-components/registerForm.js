import * as React from "react";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RegisterForm() {
  return (
    <Box action='/AlbumY/register' method='post'
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
          id="outlined-required"
          name="fName"
          label="First Name"
        />
        <TextField
          required
          id="outlined-required"
          name="lName"
          label="Last Name"
        />
        <br />
        <TextField
          required
          fullWidth
          id="outlined-required"
          name="email"
          label="Email Address"
        />
        <br />
        <TextField
          required
          id="outlined-password-input"
          name="password"
          label="Password"
          type="password"
        />
        <Button variant="contained" color="secondary" type="submit">Register</Button>
      </div>
    </Box>
  );
}