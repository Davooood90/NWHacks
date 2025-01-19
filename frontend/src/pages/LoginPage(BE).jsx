import { React, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  
  const createUser = async (cred) => {
    const response = await axios.get("http://localhost:3000/search", {
      params: { email: cred }
    });

    sessionStorage.setItem("userEmail", cred);

    console.log(response.data.length);

    if(response.data.length == 0) {
      const userData = {
        name: "sth",
        id: "sth",
        faculty: "sth",
        start_date: "sth", 
        email: cred,
        courseList: [],
      };

      axios.post("http://localhost:3000/save-json", userData);

      setUserInfo(userData);

    } else {
      console.log("found");
      setUserInfo(response.data);
    }
  }

  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const credentialResponseDecoded = jwtDecode(
            credentialResponse.credential
          );
          console.log(credentialResponseDecoded);
          createUser(credentialResponseDecoded.email);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />      
      {userInfo && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>ID:</strong> {userInfo.id}</p>
          <p><strong>Faculty:</strong> {userInfo.faculty}</p>
          <p><strong>Start Date:</strong> {userInfo.start_date}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          {userInfo.courseList && userInfo.courseList.length > 0 && (
            <div>
              <h3>Courses</h3>
              <ul>
                {userInfo.courseList.map((course, index) => (
                  <li key={index}>
                    <p><strong>Course Name:</strong> {course.name}</p>
                    <p><strong>Section:</strong> {course.section}</p>
                    <p><strong>Credits:</strong> {course.credits}</p>
                    <p><strong>Grading:</strong> {course.grading}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>

  );
};

export default HomePage;
