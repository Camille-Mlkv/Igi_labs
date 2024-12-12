import React,{ useState } from 'react';
import "./RegisterPage.css";
import MainScreen from '../../components/MainScreen/MainScreen';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/UserProvider";
import { useTimezone } from "../../components/TimezoneContext";
import GoogleAuth from '../../components/Google/GoogleAuth';

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const { setUserInfo } = useUserContext();

  const navigate = useNavigate();
  const timezone = useTimezone();


  const submitHandler=async (e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage("Passwords don't match");
    }
    else{
      setMessage(null);
      try {
        const config={
          headers:{
            "Content-type":"application/json"
          }
        }

        const {data}=await axios.post(
          "/api/users",
          {name,email,password,timezone },
          config
        );

        localStorage.setItem("userInfo",JSON.stringify(data));
        setUserInfo(data);
        navigate("/medicines");

      } catch (error) {
        setError(error.response.data.message);
      }
    }
  }

  return (
    <MainScreen title="Register">
      <div className="register-container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        <form className="register-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>

          <GoogleAuth/>
        </form>
      </div>
    </MainScreen>
  )
}

export default RegisterPage