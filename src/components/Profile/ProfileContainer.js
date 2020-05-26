import React, {useEffect, useState} from "react";
import Posts from "./Posts/Posts"
import Profile from "./Profile"
import {connect} from "react-redux";
import {
    addPost,
    getProfileStatus,
    selectProfile,
    selectUserProfile, setFormView, updateProfile, updateProfileImage,
    updateProfileStatus
} from "../../BLL/reducers/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux"
import {getFormViewMode, getPosts, getProfile, getStatus, getUpdateError} from "../../BLL/Selectors/profileSelector";
import {getIsAuth, getMeId} from "../../BLL/Selectors/authSelectors";
import ProfileFormView from "./ProfileFormView";

const ProfileContainer=(props)=>{
    let profileId = props.match.params.profileId;
    if(profileId===undefined)
        profileId=props.meId;
    if(!props.isAuth && !props.match.params.profileId){
        return <Redirect to={"/login"}/>
    }
    return <ProfileSubContainer {...props} profileId={profileId}/>
}

const ProfileSubContainer=({meId,selectUserProfile,getProfileStatus,status, addPost, posts, profile,profileId,updateProfileImage,updateProfile,formViewMode,setFormView})=>{
    let [fetchData,setFetchData]=useState(false);
    useEffect(()=>{
        selectUserProfile(profileId);
        getProfileStatus(profileId);
    },[status,profileId]);
    const onSetFormViewClick=()=>{
        setFormView(true);
    };
    const onCancelButtonClick=()=>{
        setFormView(false);
    };
    const onFormSubmit=(values)=>{
        updateProfile(values);
        //setFormView(false);
    };
    debugger;
    return <>
        {formViewMode ?
        <ProfileFormView initialValues={profile} onSubmit={onFormSubmit} onCancelButtonClick={onCancelButtonClick} profile={profile}/>
        :<><Profile onSetFormViewClick={onSetFormViewClick} editEnable={profileId===meId} profile={profile} status={status} updateProfileStatus={updateProfileStatus} updateProfileImage={updateProfileImage}/>
                <Posts posts={posts} addPost={addPost}/></>
        }
    </>
}


let mapStateToProps = (state, ownProps) => {
    return {
        posts: getPosts(state),
        profile: getProfile(state),
        status:getStatus(state),
        meId:getMeId(state),
        isAuth:getIsAuth(state),
        formViewMode:getFormViewMode(state)
    }
};

export default compose(
    connect(mapStateToProps, {
        addPost,
        selectUserProfile,
        getProfileStatus,
        updateProfileStatus,
        updateProfileImage,
        updateProfile,
        setFormView
    }),
    withRouter
)(ProfileContainer);
