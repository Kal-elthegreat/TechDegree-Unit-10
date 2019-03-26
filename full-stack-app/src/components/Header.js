import React from 'react';
// -- will need to display authenticated user from Courses via props

const Header = (props) => {
    if(localStorage.getItem('userData')){
        const userObj = JSON.parse(localStorage.getItem('userData'));
        return (
            <div>
                <div className="header">
                <div className="bounds">
                  <h1 className="header--logo">Courses</h1>
                  <nav><span>Welcome {userObj.firstName} {userObj.lastName}!</span><a className="signout" href="/signout">Sign Out</a></nav>
                </div>
                </div>
            </div>   
        )
    }
    else {
        return (
        <div>
            <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
            </div>
            </div>
        </div>      
    )
}
    
}

export default Header;