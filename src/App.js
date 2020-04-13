import React from 'react';

import './App.css';
import Navbar from "./components/Navbar/Navbar.jsx";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";


const App=()=> {
  return (

          <div className='app-wrapper'>
              <HeaderContainer/>
              <HeaderContainer/>
              <Navbar/>
              <div className="app-wrapper-content">

                  <Route path="/dialogs" render={()=><Dialogs/>}/>
                  <Route path='/profile/:profileId?' render={()=><ProfileContainer/>}/>
                  <Route path='/users' render={()=><UsersContainer/>}/>
                  <Route path='/login' render={()=><Login/>}/>
              </div>
          </div>
  );
}



export default App;
