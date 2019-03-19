import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

    state = {
      course: "",
      user: "",
      loading: true
    }

    apiGetDetails = () => {
      axios({
        method:'get',
            url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,//${id}, // how do I get selected course._id value into id?
            auth: {
              username: 'xxxxxxxxxx',
              password: 'xxxxxxxxxx'
            }
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
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={course.title} /></div>
                    <p>By {user.firstName} {user.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={course.description} /></div> {/* default value not showing */}
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={course.estimatedTime} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={"* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n* Minwax Oil Based Polyurethane\n"} /></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault()"><NavLink to={`/courses/${course._id}`}>Cancel</NavLink></button></div> {/* need to write a POST jsx expression for clck handler*/}
              </form>
            </div>
          </div>
        )
    }



}

export default UpdateCourse;