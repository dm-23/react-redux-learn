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

const ProfileContainer=({match,meId,selectUserProfile,getProfileStatus,status,isAuth, addPost, posts, profile})=>{
    let [fetchData,setFetchData]=useState(false);
    let profileId = match.params.profileId;
    if(profileId===undefined)
        profileId=meId;

    useEffect(()=>{
        selectUserProfile(profileId);
        getProfileStatus(profileId);
    },[status,profileId])

    if(!isAuth && !match.params.profileId){
        return <Redirect to={"/login"}/>
    }
    return <>
        <Profile editEnable={profileId===meId} profile={profile} status={status} updateProfileStatus={updateProfileStatus}/>
        <Posts posts={posts} addPost={addPost}/>
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
