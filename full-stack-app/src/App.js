import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
}  from 'react-router-dom';
//import axios from 'axios';
import './App.css';

// App Components
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';

class App extends Component {

  state = {
    loading: true
  }

  render() {
    return (
      <BrowserRouter>
      <div id='root'>
        <Header />
        {/* All courses */}
        <Route exact path= '/' render={() => <Courses/>}/>
        {/* Course Details */}
       <Route exact path= 'courses/:id' render={() => <CourseDetails/>}/> 
        {/* User Sign In */}
        <Route path='/signin' render={() => <UserSignIn />}/>
        {/* User Sign Up */}
        <Route path= '/signup' render={() => <UserSignUp />} />
        {/* Create Course */}
        <Route path= '/courses/create' render={() => <CreateCourse/>}/>
        {/* Update Course */}
        <Route path= '/courses/:id/update' render={() => <UpdateCourse />}/>
      </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
