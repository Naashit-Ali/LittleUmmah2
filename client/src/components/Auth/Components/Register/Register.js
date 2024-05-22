import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../Player/JoinGame/JoinGame.module.scss";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../Constant";

const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

const JoinGameInput = withStyles((theme) => ({
  root: {
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
  },
  input: {
    margin: "1rem 0",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "2px solid #ced4da",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      borderColor: theme.palette.common.black,
    },
    "&:focus": {
      borderColor: theme.palette.common.black,
    },
  },
}))(InputBase);

const Register = () => {
  const history = useHistory();

  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
      error.fname = "First Name is required";
    }
    if (!values.lname) {
      error.lname = "Last Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios.post(`${BASE_URL}/users/register`, user)
        .then((res) => {
          alert(res.data.message);
          history.push("/", { replace: true });
        })
        .catch((error) => {
          console.error("Error signing up:", error);
          // Handle error gracefully, e.g., display error message to the user
        });
    }
  };



  return (
    <div className={styles.home}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <h1 className={styles.mainTitle}>LITTLE UMMAH</h1>
        </div>
        <div className={styles.verticalMainForm}>
          <form style={{ textAlign: 'center'}}>
            <h1>Create your account as teacher</h1>
            <JoinGameInput
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              onChange={changeHandler}
              value={user.fname}
            />
            <p style={{color: 'red'}}>{formErrors.fname}</p>
            <JoinGameInput
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              onChange={changeHandler}
              value={user.lname}
            />
            <p style={{color: 'red'}}>{formErrors.lname}</p>
            <JoinGameInput
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={changeHandler}
              value={user.email}
            />
            <p style={{color: 'red'}}>{formErrors.email}</p>
            <JoinGameInput
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={changeHandler}
              value={user.password}
            />
            <p style={{color: 'red'}}>{formErrors.password}</p>
            <JoinGameInput
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={user.cpassword}
            />
            <p style={{color: 'red'}}>{formErrors.cpassword}</p>
            <MuiThemeProvider theme={darkGreyTheme}>
              <Button
                style={{
                  fontSize: "1.6rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: "1rem 0",
                }}
                variant="contained"
                color="primary"
                onClick={signupHandler}
                fullWidth
                className={styles.enterBtn}
              >
                Register
              </Button>
            </MuiThemeProvider>
          </form>
          <div style={{marginTop: 40, textAlign: 'center'}}>
            <NavLink to="/game" style={{fontSize: 14, fontWeight: 'bold', color: 'white',}}>Already registered? Login</NavLink>
          </div>
        </div>
        <div style={{ minHeight: "6rem", margin: "1rem 0" }}></div>
      </Grid>
    </div>
  );
};

export default Register;
