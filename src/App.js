import React, {Component, useEffect} from 'react';

import './App.css';
import Navbar from "./components/Navbar/Navbar.jsx";
import Dialogs from "./components/Dialogs/Dialogs";
import { Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Loader from "./common/loader/loader";
import {compose} from "redux";
import {connect} from "react-redux";
import {InitializeApp} from "./BLL/reducers/appReducer";
import {getAppInitialize} from "./BLL/Selectors/appSelectors";


const App=(props)=>{
    useEffect(()=>{
        props.InitializeApp();
    },[]);
    if(!props.initialized){
        return <Loader/>
    }
    return (
        <div className={'app-wrapper'}>
            <div className={"app-header"}>
                <HeaderContainer/>
            </div>
            <div className={'app-menu-left'}>
                <Navbar/>
            </div>
            <div className="app-wrapper-content">

                <Route path="/dialogs" render={() => <Dialogs/>}/>
                <Route path='/profile/:profileId?' render={() => <ProfileContainer/>}/>
                <Route path='/users' render={() => <UsersContainer/>}/>
                <Route path='/login' render={() => <Login/>}/>
            </div>
            <div className={'app-footer'}>
                <div className={'center'}></div>
            </div>
        </div>
    );

}

const mapStateToProps=(state)=>{
    return {
        initialized:getAppInitialize(state)
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps,{InitializeApp})
)(App);
