import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {

  // bind 'this'
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // store input values
  state= {
    user: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: ""
  }

  // gather course info to update state
  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }
  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }
  handleEstimatedChange = (event) => {
    this.setState({estimatedTime: event.target.value});
  }
  handleMaterialsChange = (event) => {
    this.setState({materialsNeeded: event.target.value});
  }

  // create new course onSubmit
  handleSubmit(event){

    event.preventDefault();

    const course = { // course data to be passed to req body
      //user:, // need a user id to pass into 
      title: this.state.title,
      description: this.state.description,
      estimatedTime: this.state.estimatedTime,
      materialsNeeded: this.state.materialsNeeded
    } 

    axios({
      method:'POST',
      url: 'http://localhost:5000/api/courses',
      data: course,
      auth: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      }
    })
    .then(response => {
      // response.status 201 / 500
      console.log(response)
      window.location.href= '/'
    })       
    .catch(function(error){
      console.log(error)
    })
  }




    render(){
        return(
            <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
        {/* renders IF error occurs, onSubmit
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          */}
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleTitleChange}/></div>
                <p>By Joe Smith</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" placeholder="Course description..." onChange= {this.handleDescriptionChange}/></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange= {this.handleEstimatedChange}/></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." onChange= {this.handleMaterialsChange}/></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" ><NavLink to='/'>Cancel</NavLink></button></div>
          </form>
        </div>
      </div>
        )
    }
}




export default CreateCourse;