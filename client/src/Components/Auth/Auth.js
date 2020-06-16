import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Auth.css";

function Auth(props) {
  const [formData, setFormData] = useState({});

  const onInputChange = (event) => {
    //event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    axios.post("http://127.0.0.1:5000/api/auth/login", formData).then((res) => {
      console.log("response", res);
      // props.retrieveUser(res.data.user);
      //props.history.push("/");
    });
  };

  return (
    <div className='mainContainer'>
      <div className='header'>
        <h2>Login</h2>
      </div>

      <Form className='form'>
        <FormGroup>
          <Label for='usernameField'>username</Label>
          <Input
            onChange={onInputChange}
            type='text'
            name='username'
            id='usernameField'
            placeholder='username'
          />
        </FormGroup>
        <FormGroup>
          <Label for='passField'>Password</Label>
          <Input
            onChange={onInputChange}
            type='password'
            name='password'
            id='passField'
            placeholder='password'
          />
        </FormGroup>
        <Button color='info' onClick={login} block>
          Login
        </Button>
      </Form>

      <div className='forgot'>
        <a href='/'>Forgot Password?</a>
        <a href='/'>Sign Up</a>
      </div>
    </div>
  );
}

export default Auth;
