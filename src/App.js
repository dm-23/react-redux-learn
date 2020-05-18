import React, {Component, Suspense, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar.jsx";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Loader from "./common/loader/loader";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {InitializeApp} from "./BLL/reducers/appReducer";
import {getAppInitialize} from "./BLL/Selectors/appSelectors";
import store from "./BLL/redux-store";


const Dialogs=React.lazy(()=>import("./components/Dialogs/Dialogs"));
const ProfileContainer=React.lazy(()=>import("./components/Profile/ProfileContainer"));
const UsersContainer=React.lazy(()=>import("./components/Users/UsersContainer"));
const Login=React.lazy(()=>import("./components/Login/Login"));

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
                <Suspense fallback={<Loader/>}>
                    <Route path="/dialogs" render={() => <Dialogs/>}/>
                    <Route path='/profile/:profileId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </Suspense>
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

const AppContainer=compose(
    withRouter,
    connect(mapStateToProps,{InitializeApp})
)(App);

const AppMain=(props)=>{
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default AppMain;
