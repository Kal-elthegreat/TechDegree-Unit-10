import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

  // bind 'this'
  constructor() {
      super();
      this.handleUpdate = this.handleUpdate.bind(this);
    }

    // will hold data from CourseDetails
    state = {
      course: "",
      user: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errorMessage:""
    }
    // GETS CourseDetails data and displays on UpdateCourse
    apiGetDetails = () => {
      axios({
        method:'get',
            url: `http://localhost:5000/api/courses/${this.props.match.params.id}`
          })
          .then(response => {
            //console.log(response.data)
            this.setState({
              course: response.data,
              user: response.data.user,
              title: response.data.title,
              description: response.data.description,
              estimatedTime: response.data.estimatedTime,
              materialsNeeded: response.data.materialsNeeded,
              loading:false
            });
          })       
          .catch(function(error){
            console.log(error)
          })
        }
     
    // handle changes in textarea/input    
    handleTitleChange = (event) => {
      this.setState({title: event.target.value});
      }
    handleDescChange = (event) => {
      this.setState({description: event.target.value});
      }
    handleEstChange = (event) => {
      this.setState({estimatedTime: event.target.value});
      }
    handleMatsChange = (event) => {
      this.setState({materialsNeeded: event.target.value});
      }

    handleUpdate(event) { // onClick submit changes

      event.preventDefault();

      const course = { // data to be passed to req body
        title: this.state.title,
        description: this.state.description,
        estimatedTime: this.state.estimatedTime,
        materialsNeeded: this.state.materialsNeeded
      } 
      axios({
        method:'PUT',
        url: `http://localhost:5000/api/courses/${this.state.course._id}`,
        data: course,
        auth: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        }
      })
      .then(res => {
        //console.log(res)
        // if(res.status = 204){
          window.location.href= `/courses/${this.state.course._id}` // return to updated CourseDetails
        //}
        
      })
      .catch(function(error){
          if(error.response){
            this.setState({ errorMessage: error.response.data.errors});
            }
          alert(this.state.errorMessage); // alert user
      }.bind(this)) // bind 'this'
  }

  componentDidMount(){
    this.apiGetDetails();
  }

    render(){
      const course = this.state.course
        const user = this.state.user
        return(
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={course.title} onChange= {this.handleTitleChange}/></div>
                    <p>By {user.firstName} {user.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." value={this.state.description} onChange= {this.handleDescChange}/></div> {/* default value not showing */}
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} onChange= {this.handleEstChange}/></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={this.state.materialsNeeded} onChange= {this.handleMatsChange}/></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button onClick= {this.handleUpdate} className="button" type="submit" href='/'>Update Course</button><button className="button button-secondary" ><NavLink to={`/courses/${course._id}`}>Cancel</NavLink></button></div> {/* need to write a POST jsx expression for clck handler*/}
              </form>
            </div>
          </div>
        )
    }



}

export default UpdateCourse;