import React from "react";
import { FormSignIn } from "./Form";
import PropTypes from "prop-types"; 
export function LoginPage({ onTokenReceived }) {
  return (
    <div>
    
          <FormSignIn onTokenReceived={onTokenReceived} />
     
    </div>
  );
}


LoginPage.propTypes = {
  onTokenReceived: PropTypes.func.isRequired
};