import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [data, setData] = useState({
    username: "proxolab",
    password: "jas34Qsd56Q03fj3yH@",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.value]: value,
    });
  };

  const Navigate = useNavigate();
  const ButFunk = (e) => {
    Navigate("/bankaekle");
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password,
    };
    console.log(userData);
    axios.post("http://localhost/api/login", userData).then((res) => {
      localStorage.setItem("token", res.data.data);
      setToken(res.data.data);
      console.log(res.data.data);
    });
  };
  
  return (
  
    <div className="loogin">
     
      <center>
        <form>
          <h1>LOGİN</h1>
          <label htmlFor="username">
            UserName :
            <input
              placeholder="Kullanıcı Adınızı Giriniz"
              type="username"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password :
            <input
              placeholder="Şifrenizi Giriniz"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          
          <button onClick={ButFunk} className="button" >
            Login 
            
          </button>
          
        </form>
      </center>
       
    </div>
  );
  
};

export default Login;
