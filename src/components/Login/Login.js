import React, { useReducer, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const initialState = {
  enteredEmail: "",
  emailIsValid: null,
  enteredPassword: "",
  passwordIsValid: null,
  formIsValid: "",
};

const reducer = (state, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        enteredEmail: action.payload,
        emailIsValid: action.payload.includes("@"),
      };
    case "EMAIL_BLUR":
      return {
        ...state,
        emailIsValid: state.enteredEmail.includes("@"),
      };
    case "PASSWORD":
      return {
        ...state,
        enteredPassword: action.payload,
        passwordIsValid: action.payload.trim().length > 6,
      };
    case "PASSWORD_BLUR":
      return {
        ...state,
        passwordIsValid: state.enteredPassword.trim().length > 6,
      };
    case "FORM_VALIDATION":
      return {
        ...state,
        formIsValid: action.payload,
      };

    default:
      break;
  }
};

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    enteredEmail,
    emailIsValid,
    enteredPassword,
    passwordIsValid,
    formIsValid,
  } = state;

  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timedValidation = setTimeout(() => {
      console.log("validating input field");
      emailIsValid &&
        passwordIsValid &&
        dispatch({
          type: "FORM_VALIDATION",
          payload: emailIsValid && passwordIsValid,
        });
    }, 500);

    return () => {
      console.log("stopping validation until typing is done");

      clearInterval(timedValidation);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatch({ type: "EMAIL", payload: event.target.value });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: "PASSWORD", payload: event.target.value });
    // setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatch({ type: "EMAIL_BLUR" });
    // setEmailIsValid(enteredEmail.includes("@"));
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
            value={enteredEmail}
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
