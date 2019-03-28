import React from "react";
import {
  Route,
  Redirect
} from "react-router-dom";

let authenticate = false;

const PrivateRoute = ({ component: Component, ...rest }) => {

     if(localStorage.getItem('userData')){
         authenticate = true;
     }
    return (
        <Route {...rest} render= {
            props => (authenticate ? <Component {...props}/> : 
            <Redirect to= {{pathname: '/signin', state: {from: props.location}}}/> 
        )}/>
    )

}


export default PrivateRoute;