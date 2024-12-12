import React,{ useState } from "react"; //useEffect
import "./Header.css";
import {Link,useNavigate} from 'react-router-dom';
import { useUserContext } from '../UserProvider';

export const Header = () => {
  //const [userInfo, setUserInfo] = useState(null);
  const { userInfo, setUserInfo } = useUserContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUserInfo = localStorage.getItem("userInfo");
  //   if (storedUserInfo) {
  //     console.log('here');
  //     setUserInfo(JSON.parse(storedUserInfo));
  //   }
  // },[]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header>
      {/* Логотип и кнопки слева */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="logo">
          <Link to='/'>
            LifeLine
          </Link>
          
        </div>
        <div className="left-buttons">

          <Link to='medicines'> 
            Catalog
          </Link>

          <Link to='questions'> 
            Q&A
          </Link>

          <Link to='news'> 
            News
          </Link>

          <Link to='age'> 
            Get age
          </Link>

          <Link to='country'> 
            Get country
          </Link>

          

        </div>
      </div>

      {/* Кнопки справа */}
      <div className="right-buttons">
      {userInfo ? (
        <div className="user-menu">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Hello, {userInfo.name} ▼
          </button>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to="/login" className="link-button">
            Login
          </Link>
          <Link to="/register" className="link-button">
            Register
          </Link>
        </>
      )}
        
      </div>
    </header>
  );
};
