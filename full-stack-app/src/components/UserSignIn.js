import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


class UserSignIn extends Component {

  // bind 'this'
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // will hold credentials
  state = {
    username: "",
    password:""
  }

  // gather credentials
  gatherUsername = (event) =>{
    this.setState({username: event.target.value})
  }
  gatherPassword = (event) =>{
    this.setState({password: event.target.value})
  }

  // request for user using given credentials
  handleSubmit(event){
    event.preventDefault();

    axios({
      method:'GET',
      url: 'http://localhost:5000/api/users',
      auth: {
      username: this.state.username,
      password: this.state.password
    }
    })
    .then(response => {
      // response.status 201 / 500
      console.log(response) 
      localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
      window.location.href= '/'
    })       
    .catch(function(error){
      console.log(error)
    })
  }





    render() {
        return(
            <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit= {this.handleSubmit}>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.gatherUsername} /></div>
              <div><input id="password" name="password" type="password" placeholder="Password" onChange={this.gatherPassword} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" >Sign In</button><button className="button button-secondary"><NavLink to='/'>Cancel</NavLink></button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
        </div>
      </div>
        )
    }
}




export default UserSignIn;