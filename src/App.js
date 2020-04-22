import React, {Component} from 'react';

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


class App extends React.Component {
    componentDidMount(): void {
        this.props.InitializeApp();
    }
    render() {
        if(!this.props.initialized){
           return <Loader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">

                    <Route path="/dialogs" render={() => <Dialogs/>}/>
                    <Route path='/profile/:profileId?' render={() => <ProfileContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return ({initialized:state.app.initialized});
}

export default compose(
    withRouter,
    connect(mapStateToProps,{InitializeApp})
)(App);
