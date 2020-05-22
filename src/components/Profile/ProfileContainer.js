import React, {useEffect, useState} from "react";
import Posts from "./Posts/Posts"
import Profile from "./Profile"
import {connect} from "react-redux";
import {
    addPost,
    getProfileStatus,
    selectProfile,
    selectUserProfile, updateProfileImage,
    updateProfileStatus
} from "../../BLL/reducers/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux"
import {getPosts, getProfile, getStatus} from "../../BLL/Selectors/profileSelector";
import {getIsAuth, getMeId} from "../../BLL/Selectors/authSelectors";

const ProfileContainer=(props)=>{
    let profileId = props.match.params.profileId;
    if(profileId===undefined)
        profileId=props.meId;
    if(!props.isAuth && !props.match.params.profileId){
        return <Redirect to={"/login"}/>
    }
    return <ProfileSubContainer {...props} profileId={profileId}/>
}

const ProfileSubContainer=({meId,selectUserProfile,getProfileStatus,status, addPost, posts, profile,profileId,updateProfileImage})=>{
    let [fetchData,setFetchData]=useState(false);

    useEffect(()=>{
        selectUserProfile(profileId);
        getProfileStatus(profileId);
    },[status,profileId]);





    return <>
        <Profile editEnable={profileId===meId} profile={profile} status={status} updateProfileStatus={updateProfileStatus} updateProfileImage={updateProfileImage}/>
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
        updateProfileStatus,
        updateProfileImage
    }),
    withRouter
)(ProfileContainer);
