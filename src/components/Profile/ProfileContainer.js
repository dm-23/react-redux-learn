import React, {useEffect, useState} from "react";
import Posts from "./Posts/Posts"
import Profile from "./Profile"
import {connect} from "react-redux";
import {
    addPost,
    getProfileStatus,
    selectProfile,
    selectUserProfile,
    updateProfileStatus
} from "../../BLL/reducers/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import withAuthRedirect from "../../Hoc/withAuthRedirect";
import {compose} from "redux"

const ProfileContainer=props=>{
    let [fetchData,setFetchData]=useState(false);
    let profileId = props.match.params.profileId;
    if(profileId===undefined)
        profileId=props.meId;
    console.log(props)
    useEffect(()=>{
        console.log(`Установка профиля ${profileId}`);
        props.selectUserProfile(profileId);
    },[profileId]);

    useEffect(()=>{
        console.log(`Установка статуса для ${profileId} текущий статус ${props.status}`);
        props.getProfileStatus(profileId);
    },[props.status,profileId])

    if(!props.isAuth && !props.match.params.profileId){
        return <Redirect to={"/login"}/>
    }
    return <>
        <Profile editEnable={profileId===props.meId} profile={props.profile} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
        <Posts posts={props.posts} addPost={props.addPost}/>
    </>
}


let mapStateToProps = (state, ownProps) => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status:state.profilePage.status,
        meId:state.auth.id,
        isAuth:state.auth.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {
        addPost,
        selectUserProfile,
        getProfileStatus,
        updateProfileStatus
    }),
    withRouter
)(ProfileContainer);
