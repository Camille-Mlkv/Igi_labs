import React,{ useState,useEffect } from 'react'
import MainScreen from '../../components/MainScreen/MainScreen'
import './LoginPage.css';
import axios from 'axios';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/UserProvider";


const LoginPage = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(false);
  const navigate = useNavigate(); 

  const { setUserInfo } = useUserContext();

  useEffect(() => {
    const userInfo=localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/medicines");
    }
  });

  const submitHandler= async (e)=>{
    e.preventDefault();
    try {
      const config={
        headers:{
          "Content-type":"application/json"
        }
      }


      const {data}=await axios.post('/api/users/login/',{
        email,password
      },config);

      console.log(data);
      localStorage.setItem("userInfo",JSON.stringify(data));
      setUserInfo(data);
      setError(false);

      navigate("/medicines");
      
    } catch (error) {
      setError(error.response.data.message);
    }
  }


  return (
    <MainScreen title="Login">
      <div className="login-container">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <form className="login-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
    </MainScreen>
  )
}

export default LoginPage