import React from "react";
import { jwtDecode } from "jwt-decode";

import { GoogleLogin } from "@react-oauth/google";

const HomePage = () => {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const credentialResponseDecoded = jwtDecode(
          credentialResponse.credential
        );
        console.log(credentialResponseDecoded);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default HomePage;
