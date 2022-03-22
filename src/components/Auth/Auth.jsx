import React from "react";
import './Auth.css';





function Auth(props) {


  return (
    <section className="auth">
        <div className="auth_container">
            {props.children}
        </div>
    </section>
  );
}

export default Auth;
