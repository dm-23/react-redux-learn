import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {getUserAuth, setUserAuth} from "../../BLL/reducers/authReducer";

const HeaderContainer=({id,login,email})=>{
    return <Header id={id} login={login} email={email}/>
}

const mapStateToProps=(state)=>{
    return {
        id:state.auth.id,
        login:state.auth.login,
        email:state.auth.email
    }
}

export default connect(mapStateToProps)(HeaderContainer)