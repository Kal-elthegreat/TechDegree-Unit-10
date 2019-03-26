import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


class UserSignUp extends Component{

  // bind 'this'
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // store input values
  state ={
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: ""
  }

  // gather user info from inputs
  firstNameChange = (event) =>{
    this.setState({firstName: event.target.value})
  }
  lastNameChange = (event) =>{
    this.setState({lastName: event.target.value})
  }
  emailChange = (event) =>{
    this.setState({emailAddress: event.target.value})
  }
  passwordChange = (event) =>{
    this.setState({password: event.target.value})
  }

  // make sure passwords are identical
  passwordMatch = (event) =>{
    if(event.target.value === this.state.password){
      console.log(true)
    } else {
      console.log(false)
    }
  }

  handleSubmit(event){ // create user onSubmit

    event.preventDefault();

    const user= { // create user data to pass to req body
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      password:this.state.password
    } 

    axios({
      method:'POST',
      url: 'http://localhost:5000/api/users',
      data: user
    })
    .then(response => {
      // response.status 201 / 500
      console.log(response)
      window.location.href= '/signin'
    })       
    .catch(function(error){
      console.log(error)
    })
  }


    render(){ 
        return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div><input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={this.firstNameChange} /></div>
              <div><input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={this.lastNameChange} /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.emailChange} /></div>
              <div><input id="password" name="password" type="password" placeholder="Password" onChange={this.passwordChange} /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.passwordMatch} /></div>
              <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Sign Up</button>
              <button className="button button-secondary" ><NavLink to='/'>Cancel</NavLink></button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>
        )
    }

}





export default UserSignUp;