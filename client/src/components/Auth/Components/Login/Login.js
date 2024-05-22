import React, { useState, useEffect } from "react";
import styles from "../../../Player/JoinGame/JoinGame.module.scss"; // Import JoinGame styles for consistent UI
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import grey from "@material-ui/core/colors/grey";
import Button from "@material-ui/core/Button";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { colors } from "@material-ui/core";
import Cookies from "js-cookie";
import { BASE_URL } from "../../../../Constant";

const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

const buttonStyle = {
  backgroundColor: "#E0FFFF",
  color: "black",
  padding: "10px 20px",
  borderRadius: "8px",
  fontSize: "1.6rem",
  fontWeight: "bold",
  borderColor: "black",
  cursor: "pointer",
};

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
    width: "100%",
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

const Login = ({ setUserState, onLoginSuccess }) => {
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
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
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post(`${BASE_URL}/users/login`, user).then((res) => {
        alert(res.data.message);
        console.log(res.data.token);
        Cookies.set("token", res.data.token,{

        });
        // setUserState(res.data.user);
        onLoginSuccess(); // Notify parent component of successful login
        history.push("/", { replace: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    }
  }, [formErrors]);

  return (
    <div className={styles.homee}>
      <div style={{ textAlign: 'center'}}>
        <form>
          <h1>Login</h1>
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
              onClick={loginHandler}
              fullWidth
              className={styles.enterBtn}
            >
              Login
            </Button>
          </MuiThemeProvider>
        </form>
        <div style={{marginTop: 40}}>
        <NavLink to="/register" style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>Not yet registered? Register Now</NavLink>
      </div>
      </div>
    </div>
  );
};

export default Login;
