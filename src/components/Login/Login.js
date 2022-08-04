import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Grid, Paper, Avatar, TextField, Button, Box } from "@mui/material";
import Image from "./login_wallpaper.jpg";

const styles = {
  divContainer: {
    backgroundImage: `url(${Image})`,
    height: 580,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
};

export default function Login() {
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "20px auto"
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnStyle = { margin: "8px 0" };
  return (
    <div style={styles.divContainer}>
      <Grid container justify="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log In</h2>
          </Grid>
          <Grid>
            <TextField label="Username" focused fullWidth color="secondary" />
          </Grid>
          <Grid pt={2}>
            <TextField
              label="Password"
              type="password"
              focused
              fullWidth
              color="secondary"
            />
          </Grid>
          <Grid pt={2}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              style={btnStyle}
              fullWidth
            >
              Sign in
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
