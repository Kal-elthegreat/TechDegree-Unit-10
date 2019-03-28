import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {

  // hold courses to map()
    state = {
        courses: [],
        loading: true
    }

    apiGetCourses = () => {
        axios({
          method:'GET',
          url: 'http://localhost:5000/api/courses'
          // auth: {
          //   username: localStorage.getItem('username'),
          //   password: localStorage.getItem('password')
          // }
        })
        .then(response => {
          this.setState({
            courses: response.data,
            loading:false
          });
        })       
        .catch(function(error){
          console.log(error)
        })
      }
      componentDidMount(){
        this.apiGetCourses();
      }

    render(){
      // map each course out 
        return(
          <div className='bounds'>
            {this.state.courses.map(course =>
              <div key={course._id} className="grid-33"><NavLink to={`courses/${course._id}`} className="course--module course--link">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </NavLink></div>
              )}
              <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>New Course</h3>
              </a></div>  
            </div>    
          ) // end return
        } // end render   
}

export default Courses;
