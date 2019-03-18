import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


class UserSignUp extends Component{


    render(){
        return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div><input id="firstName" name="firstName" type="text" className placeholder="First Name"  /></div>
              <div><input id="lastName" name="lastName" type="text" className placeholder="Last Name"  /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address"  /></div>
              <div><input id="password" name="password" type="password" className placeholder="Password"  /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className placeholder="Confirm Password"  /></div>
              <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Sign Up</button>
              <button className="button button-secondary" onclick="event.preventDefault()"><NavLink to='/'>Cancel</NavLink></button>
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