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
import {compose} from "redux"
import {getPosts, getProfile, getStatus} from "../../BLL/Selectors/profileSelector";
import {getIsAuth, getMeId} from "../../BLL/Selectors/authSelectors";

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
        posts: getPosts(state),
        profile: getProfile(state),
        status:getStatus(state),
        meId:getMeId(state),
        isAuth:getIsAuth(state)
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
