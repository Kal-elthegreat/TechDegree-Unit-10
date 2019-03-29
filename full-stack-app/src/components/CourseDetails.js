import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

class CourseDetails extends Component {

  // bind 'this'
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  // course & user will store data for use in rendering
  state= {
    course: '',
    user:'',
    loading: true
  }

  apiGetDetails = () => { // get the course by course._id
    axios({
      method:'GET',
          url: `http://localhost:5000/api/courses/${this.props.match.params.id}`
          // auth: {
          //   username: 'xxxxxxxxxx',
          //   password: 'xxxxxxxxxx'
          // }
        })
        .then(response => {
          console.log(response.data)
          this.setState({
            course: response.data,
            user: response.data.user,
            loading:false
          });
        })       
        .catch(function(error){
          console.log(error)
        })
      }
      componentDidMount(){
        this.apiGetDetails();
      }


  handleDelete(event){ // onClick will delete the selected course
    //event.preventDefault();
    console.log('Hello')

    axios({
      method:'DELETE',
      url: `http://localhost:5000/api/courses/${this.state.course._id}`,
      auth: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      console.log(res)
      console.log(res.data)
    })
    .catch(function(error){
      console.log(error)
    })
  }


    render(){
        const course = this.state.course
        const user = this.state.user
        const userObj = JSON.parse(localStorage.getItem('userData'));
        // if user logged-in and id matches user id of course
        if(localStorage.getItem('userData') && userObj._id === user._id){ 
          return(
            <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100"><span><a className="button" href={`/courses/${course._id}/update`}>Update Course</a><a onClick={this.handleDelete }className="button" href="/">Delete Course</a></span><a className="button button-secondary" href="/">Return to List</a></div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>By {user.firstName} {user.lastName}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source= {course.description}/>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                        <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            )
        } else {
          return(
            <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100"><a className="button button-secondary" href="/">Return to List</a></div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>By {user.firstName} {user.lastName}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown source= {course.description}/>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                      <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          )

        }
        
    }

}
export default CourseDetails;