import React from 'react';
// -- will need to display authenticated user from Courses via props

const Header = (props) => {
    return (
        <div>
            <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              {/*if signed in: */}
              <nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>
              {/* else: 
              <nav><span>Welcome Joe Smith!</span><a class="signout" href="/signout">Sign Out</a></nav>
              */}
            </div>
          </div>
    </div>
          
    )
}

export default Header;