import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";
import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Input from "./Input";
import { useHistory } from "react-router-dom";
import { signup,signin } from "../../actions/auth"

const initialState = {firstName : '',lastName : '',email:'',password: '',confirmPassword:''};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch(); 
  const history = useHistory();
  // const isSignup = true;

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData,setFromData] = useState(initialState);
  
  


  const handleShowPassword = () =>
    setShowPassword((prevshowPassword) => !prevshowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();// to prevent the browser to refres

    if(isSignup)
    {
      dispatch(signup(formData,history)); 
    }
    else{
      dispatch(signin(formData,history));

    }
     console.log(formData);
  };

  const handleChange = (e) => {
    setFromData({ ...formData,[e.target.name] : e.target.value})
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const googleSuccess = async (res) => { 
     console.log(res);
    // ?.---> optional chaning operator

    //const result = res?.profileObj;
    const result = (res?.credential);
    const token = res?.clientId;
     try {
        dispatch({ type: 'AUTH' , data : { result,token} });
        history.push('/');
         console.log("inside try block");
     } catch (error) {
        console.log(error);
        console.log("here is your error");
     } 

    console.log("successfully login");
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? "Sign Up" : "Sign In"}{" "}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              lable="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            className={classes.googleButton}
          />

          {/* ; ; */}
          {/* <GoogleLogin
            clientId="145438146866-cp94u70bdc9gn47t1sc0ibt871qlq5rh.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an accont? Sign In"
                  : "Don't have an accont? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
