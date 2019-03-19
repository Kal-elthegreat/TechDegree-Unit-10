import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
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
      <Switch>
        {/* All courses */}
        <Route exact path= '/' render={() => <Courses/>}/>
        {/* Create Course */}
       <Route path= '/courses/create' render={() => <CreateCourse/>}/>
       {/* Update Course */}
       <Route path= '/courses/:id/update' component= {UpdateCourse}/>
        {/* Course Details */}
       <Route path= '/courses/:id' component= {CourseDetails}/> 
        {/* User Sign In */}
        <Route path='/signin' render={() => <UserSignIn />}/>
        {/* User Sign Up */}
        <Route path= '/signup' render={() => <UserSignUp />} />
      </Switch>
      </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
