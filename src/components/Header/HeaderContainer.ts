import React from "react"
import {connect} from "react-redux";
import {logout} from "../../BLL/reducers/authReducer";
import {AppState} from "../../BLL/redux-store";

export type PropertyType={
    id:number | null
    login:string |null
    email:string |null
}

export type DispType={
    logout:()=>void
}

export type AllPropsDisp=PropertyType & DispType;

const HeaderContainer:React.FC<AllPropsDisp>=({id,login,logout})=>{
    //return <Header id={id} login={login} logout={logout}/>
}

const mapStateToProps=(state:AppState):PropertyType=>{
    return {
        id:state.auth.id,
        login:state.auth.login,
        email:state.auth.email
    }
}

export default connect<PropertyType,DispType,{},AppState>(mapStateToProps,{logout})(HeaderContainer)