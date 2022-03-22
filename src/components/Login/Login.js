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
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        ...state,
        enteredEmail: action.payload,
        emailIsValid: action.payload.includes("@"),
      };
    case "EMAIL_BLUR":
      return {
        enteredEmail: state.enteredEmail,
        emailIsValid: state.enteredEmail.includes("@"),
      };
    case "PASSWORD_INPUT":
      return {
        ...state,
        enteredPassword: action.payload,
        passwordIsValid: action.payload.trim().length > 6,
      };

    default:
      return {
        enteredEmail: "",
        emailIsValid: null,
        enteredPassword: "",
        passwordIsValid: null,
      };
  }
};

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timedValidation = setTimeout(() => {
      console.log("validating input field");
      setFormIsValid(state.emailIsValid && state.passwordIsValid);
    }, 200);

    return () => {
      console.log("stopping validation until typing is done");

      clearInterval(timedValidation);
    };
  }, [state.emailIsValid, state.passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatch({ type: "EMAIL_INPUT", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatch({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.email, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={state.email}
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
