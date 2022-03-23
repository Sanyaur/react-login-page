import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const initialState = {
  enteredEmail: "",
  emailIsValid: null,
  enteredPassword: "",
  passwordIsValid: null,
};
const reducer = (state, action) => {
  console.log(state.payload);
  switch (action.type) {
    case "INPUT_EMAIL":
      return {
        ...state,
        enteredEmail: action.payload,
      };
    case "INPUT_PASSWORD":
      return {
        ...state,
        emailIsValid: state.enteredEmail.includes("@"),
      };
    default:
      return initialState;
  }
};

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { enteredEmail, emailIsValid, enteredPassword, passwordIsValid } =
    state;

  console.log(state);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timedValidation = setTimeout(() => {
      console.log("validating input field");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      console.log("stopping validation until typing is done");

      clearInterval(timedValidation);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatch({ type: "INPUT_EMAIL", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: "INPUT_PASSWORD", payload: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatch({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatch({ type: "PASSWORD_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={state.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
