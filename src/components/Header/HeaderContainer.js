import React from "react"
import Header from "./Header";
import {connect} from "react-redux";
import {getUserAuth, setUserAuth} from "../../BLL/reducers/authReducer";

class HeaderContainer extends React.Component
{
       render(){
        return <Header id={this.props.id} login={this.props.login} email={this.props.email}/>
    }
}

const mapStateToProps=(state)=>{
    return {
        id:state.auth.id,
        login:state.auth.login,
        email:state.auth.email
    }
}

export default connect(mapStateToProps, {})(HeaderContainer)