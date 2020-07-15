import React from "react"
import {Redirect} from "react-router-dom";
import {connect, ConnectedComponent} from "react-redux";
import {AppState} from "../BLL/redux-store";

type MapToPropsType={
    isAuth:boolean
}

let mapStateToProps=(state:AppState):MapToPropsType=>{
    return {
        isAuth:state.auth.isAuth
    }
}

let withAuthRedirect=(Component:React.Component | React.FC)=>{
    let ContainerComp=(props:MapToPropsType):React.Component | React.FC=>{
        if(!props.isAuth)
            return <Redirect to="/login"/>


        return <Component {...props}/>
    }
    return connect<MapToPropsType,{},{},AppState>(mapStateToProps)(ContainerComp);
}

export default withAuthRedirect