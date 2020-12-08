import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";



function Login() {
   
    const [{}, dispatch] = useStateValue();

    const signIn = () => {

        auth
        .signInWithPopup(provider)
        .then(result =>  {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch((error) => alert(error.message));
    };

  return (
    <div className="login">
      <div className="login_container">
          <img
          src='https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032015/whatsapp.jpg?itok=dTlsxLl4'
          alt="login"/>
          <div className="login_text">
            <h1>Sign in to WhatsApp</h1>
          </div>
          <Button type="submit" onClick={signIn}>
              Sign in to WhatsApp
          </Button>
      </div>
    </div>
  );
}

export default Login;
