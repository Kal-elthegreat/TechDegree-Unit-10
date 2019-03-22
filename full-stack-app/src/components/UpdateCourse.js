import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

  constructor() {
      super();
      this.handleUpdate = this.handleUpdate.bind(this);
    }

    state = {
      course: "",
      user: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: ""
    }

    apiGetDetails = () => {
      axios({
        method:'get',
            url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,//${id}, // how do I get selected course._id value into id?
            auth: {
              username: 'joe@smith.com',
              password: 'joepassword'
            }
          })
          .then(response => {
            console.log(response.data)
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
        componentDidMount(){
          this.apiGetDetails();
        }

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

    handleUpdate(event) {
      //event.preventDefault();
      axios({
        method:'PUT',
        url: `http://localhost:5000/api/courses/${this.state.course._id}`,
        auth: {
          username: 'jsoe@smith.com',
          password: 'joepassword'
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
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." defaultValue={course.description} onChange= {this.handleDescChange}/></div> {/* default value not showing */}
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
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={"* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n* Minwax Oil Based Polyurethane\n"} onChange= {this.handleMatsChange}/></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button onClick= {this.handleUpdate} className="button" type="submit" href={`/courses/${course._id}`}>Update Course</button><button className="button button-secondary" ><NavLink to={`/courses/${course._id}`}>Cancel</NavLink></button></div> {/* need to write a POST jsx expression for clck handler*/}
              </form>
            </div>
          </div>
        )
    }



}

export default UpdateCourse;
//        handleTitleChange = (event) => {
  //       this.setState({title: event.target.value});
  //     }
  //     handleDescriptionChange = (event) => {
  //       this.setState({description: event.target.value});
  //     }
  //     handleEstimatedChange = (event) => {
  //       this.setState({estimatedTime: event.target.value});
  //     }
  //     handleMaterialsChange = (event) => {
  //       this.setState({materialsNeeded: event.target.value});
  //     }

  // handleUpdate(event) {
  //   event.preventDefault();
  //   console.log(
  //     'title:' + this.state.title,
  //     'desc:' + this.state.description,
  //     'est:' + this.state.estimatedTime,
  //     'mats:' + this.state.materialsNeeded,
  //   )
  // }

  // constructor() {
  //   super();
  //   this.handleUpdate = this.handleUpdate.bind(this);
  // }