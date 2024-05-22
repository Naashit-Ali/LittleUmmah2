import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './JoinGame.module.scss';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { socket } from '../../Global/Header';
import LoginModal from '../../Auth/Components/Login/Login'; 






const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    }
  }
});

const buttonStyle = {
  backgroundColor: "#E0FFFF",
  color: "black",
  width: "45%",
  padding: "10px 20px",
  borderRadius: "8px",
  fontSize: "1.6rem",
  fontWeight: "bold",
  borderColor: "black",
  cursor: "pointer",
};

const JoinGameInput = withStyles(theme => ({
  root: {
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
  },
  input: {
    margin: "1rem 0",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '2px solid #ced4da',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      borderColor: theme.palette.common.black
    },
    '&:focus': {
      borderColor: theme.palette.common.black
    },
  },
}))(InputBase);

export default class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      nickname: null,
      pin: null,
      message: null,
      disabled: false,
      role: null, // 'student' or 'teacher'
      isTeacherLoggedIn: false // Track whether teacher is logged in
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleClick = event => {
    this.setState({
      disabled: true
    });

    setTimeout(() => this.setState({
      disabled: false
    }), 500);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { nickname, pin } = this.state;
    // Handle form submission based on role
    if (this.state.role === 'student') {
      this.handleSubmitStudent();
    } else if (this.state.role === 'teacher') {
      // Handle teacher submission
    }
  };

  handleSubmitStudent = () => {
    const { nickname, pin } = this.state;
    socket.emit("PLAYER_JOINED", {
      nickname: nickname,
      pin: parseInt(pin)
    });
  };

  componentDidMount() {
    socket.on("NICKNAME_TAKEN", () => {
      this.setState({
        message: "Nickname taken"
      });

      setTimeout(() => this.setState({
        message: null
      }), 3000);
    });

    socket.on("GAME_NOT_FOUND", () => {
      this.setState({
        message: "Not found"
      });

      setTimeout(() => this.setState({
        message: null
      }), 3000);

    });

    socket.on("PLAYER_JOINED_SUCCESSFULLY", data => {
      this.props.history.push(`/instructions?nickname=${this.state.nickname}&pin=${this.state.pin}`)
    })
  }

  handleRoleSelect = (role) => {
    this.setState({ role });
  };

  handleLoginSuccess = () => {
    this.setState({ isTeacherLoggedIn: true });
  };

  render() {
    const { role, isTeacherLoggedIn } = this.state;
    let error;

    if (this.state.message === null) {
      error = null;
    } else if (this.state.message === "Not found") {
      error = <div className={styles.error}><div>We didn't recognise the game pin.</div>Please check and try again.</div>;
    } else if (this.state.message === "Nickname taken") {
      error = <div className={styles.error}>Sorry, that nickname is taken.</div>;
    }

    let buttons;
    let additionalContent;
    if (role === 'student') {
      // Render student join form
      buttons = (
        <>
          <form onSubmit={this.handleSubmit}>
            <JoinGameInput
              placeholder="NICKNAME"
              name="nickname"
              value={this.state.nickname || ''}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
              required
              fullWidth
            />
            <JoinGameInput
              placeholder="GAME PIN"
              name="pin"
              value={this.state.pin || ''}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
              required
              fullWidth
            />
            <MuiThemeProvider theme={darkGreyTheme}>
              <Button
                style={{
                  fontSize: "1.6rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: "1rem 0"
                }}
                variant="contained"
                color="primary"
                type="submit"
                disabled={this.state.disabled}
                fullWidth
                className={styles.enterBtn}
              >
                Enter
              </Button>
            </MuiThemeProvider>
          </form>
        </>
      );
    } else if (role === 'teacher') {
      if (!isTeacherLoggedIn) {
        additionalContent = <LoginModal onLoginSuccess={this.handleLoginSuccess} />;
      } else {
        additionalContent = (
          <div style={{ textAlign: "center" }}>
            <p className={styles.hostQuiz}>
              <Link to="/quizzes" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
                HOST a quiz
              </Link>
            </p>
            <p className={styles.createQuiz} style={{ fontWeight: "bold" }}>
              OR
            </p>
            <p className={styles.createQuiz}>
              <Link to="/quizzes/new" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
                CREATE your own
              </Link>
            </p>
          </div>
        );
      }
    }

    return (
      <div className={styles.home}>
        <Grid
          container
          direction="column"
          alignItems="center"
          //   justify="center"
          style={{ minHeight: '100vh' }}
        >
          <div>
            <h1 className={styles.mainTitle}>LITTLE UMMAH</h1>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <button onClick={() => this.handleRoleSelect('student')} style={buttonStyle}>Student</button>
              <button onClick={() => this.handleRoleSelect('teacher')} style={buttonStyle}>Teacher</button>
            </div>
          </div>
          <div className={styles.verticalMainForm}>
            {buttons}
            {additionalContent}
          </div>
          <div style={{ minHeight: "6rem", margin: "1rem 0" }}>
          </div>
        </Grid>
      </div>
    )
  }
}