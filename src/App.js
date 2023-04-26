import myImage from './images/Pom&HoneyGUI.png';
import homeFoodOne from './images/LambBowl.png';
import homeFoodTwo from './images/chickenGyro.png';
import homeFoodThree from './images/falafels.png';
import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import Order from './order';

function App() {
  // const [data, setData] = useState([{}])

  // useEffect(() => {
  //   fetch("/items")
  //   .then(res => res.json())/*Query Backend server and get info at /items*/
  //   .then(data => {
  //       setData(data)
  //       console.log(data)
  //     } // Set data 
  //   )
  // }, [])

  return (
    <Router>
      <AppContent />
    </Router> 
  );
}


function AppContent() {

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1074359674943-ugp07ruom5p3bbqgi0882hrcn65t1j21.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);


  return (
    <div className={`App${isHomePage ? ' home-page' : ''}`}>
        <header className="App-header">
          <div className="header-right">
            <div id="signInDiv"></div>
            {Object.keys(user).length !== 0 && (
              <button className="signOut-button button-hover-effect" onClick={(e) => handleSignOut(e)}>Sign Out</button>
            )}
            {Object.keys(user).length !== 0 && (
              <button className="displayUser button-hover-effect">Welcome, {user.name}</button>
            )}
            {isHomePage && (
              <Link to="/order"><button className="orderNow-button button-hover-effect">Order Here!</button></Link>
            )}
            {!isHomePage && (
              <Link to=""><button className="orderNow-button button-hover-effect">Back to Home!</button></Link>
            )}
          </div>
        </header>
      <Routes>
        <Route path="/order" element={<Order />} />
      </Routes>
      <div className="image-container">
      {isHomePage && <img src={myImage} className="App-logo" alt="logo" />}
      {!isHomePage && <img src={myImage} className="App-logo-small" alt="logo" />}
      {isHomePage && <img src={homeFoodOne} className="Food-one" alt="logo" />}
      {!isHomePage && <img src={homeFoodOne} className="Food-one-off" alt="logo" />}
      {isHomePage && <img src={homeFoodTwo} className="Food-two" alt="logo" />}
      {!isHomePage && <img src={homeFoodTwo} className="Food-two-off" alt="logo" />}
      {isHomePage && <img src={homeFoodThree} className="Food-three" alt="logo" />}
      {!isHomePage && <img src={homeFoodThree} className="Food-three-off" alt="logo" />}
      </div>
    </div>
  );
}

export default App;
