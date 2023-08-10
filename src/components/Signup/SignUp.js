import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Kid's thrift store
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    green: {
      main: "#008b8b",
      contrastText: "#FFF",
    },
  },
});

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [created, setCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/clients/newAccount", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setCreated(true);
      } else {
        const data = await res.json();
        setEmailError(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkError = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/verification/newAccount", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });
      const data = await res.json();

      if (data.fieldErrors) {
        data.fieldErrors.forEach((fieldError) => {
          if (fieldError.field === "email") {
            setEmailError(fieldError.message);
          }
          if (fieldError.field === "password") {
            setPasswordError(fieldError.message);
          }
          if (fieldError.field === "firstName") {
            setFirstNameError(fieldError.message);
          }
          if (fieldError.field === "lastName") {
            setlastNameError(fieldError.message);
          }
        });
      } else {
        handleSubmit(e);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (created) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={checkError} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {firstNameError ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {firstNameError}
                    </span>
                  ) : (
                    ""
                  )}
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setFirstNameError("");
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {lastNameError ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {lastNameError}
                    </span>
                  ) : (
                    ""
                  )}
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setlastNameError("");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {emailError ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {emailError}
                    </span>
                  ) : (
                    ""
                  )}
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {passwordError ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {passwordError}
                    </span>
                  ) : (
                    ""
                  )}
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="green"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item className="themeColor">
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    );
  }
}
