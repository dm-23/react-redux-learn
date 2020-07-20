import React, {useEffect, useState} from "react";
import Posts from "./Posts/Posts"
import Profile from "./Profile"
import {connect} from "react-redux";
import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";
import {compose} from "redux"
import {getFormViewMode, getPosts, getProfile, getStatus} from "../../BLL/Selectors/profileSelector";
import {getIsAuth, getMeId} from "../../BLL/Selectors/authSelectors";
import ProfileFormView from "./ProfileFormView";
import {AppState} from "../../BLL/redux-store";
import {
    getProfileStatus,
    profileActions,
    selectUserProfile, setFormView, updateProfile, updateProfileImage,
    updateProfileStatus
} from "../../BLL/reducers/profileReducer";
import {PostType, ProfileType} from "../../types/types";

type MapToStateType={
    posts: PostType[],
    profile: ProfileType | null,
    status:string,
    meId:number | null,
    isAuth:boolean,
    formViewMode:boolean
}

type MapToDispatchType={
    addPost:(newPost:string)=>void,
    selectUserProfile:(profileId:number)=>void,
    getProfileStatus:(profileId:number)=>void,
    updateProfileStatus:(newStatus:string)=>void,
    updateProfileImage:(file:any)=>void,
    updateProfile:(profile:ProfileType)=>void,
    setFormView:(value:boolean)=>void
}

type PropsType =MapToStateType & MapToDispatchType & RouteComponentProps<{ profileId:string }>



const ProfileContainer:React.FC<PropsType>=(props)=>{
    let profileId =props.match.params.profileId===undefined ? props.meId : Number(props.match.params.profileId);

    if(!props.isAuth && !profileId){
        return <Redirect to={"/login"}/>
    }
    return <ProfileSubContainer {...props} profileId={profileId}/>
}

const ProfileSubContainer:React.FC<PropsType & {profileId: number}>=({meId,selectUserProfile,getProfileStatus,status, addPost, posts, profile,profileId,updateProfileImage,updateProfile,formViewMode,setFormView,updateProfileStatus})=>{
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
    const onFormSubmit=(values:ProfileType)=>{
        updateProfile(values);
    };
    debugger;
    return
        {formViewMode ?
        <ProfileFormView initialValues={profile}
        onSubmit={onFormSubmit}
        onCancelButtonClick={onCancelButtonClick} profile={profile}/>
        :<Profile onSetFormViewClick={onSetFormViewClick}
        editEnable={profileId===meId} profile={profile}
        status={status} updateProfileStatus={updateProfileStatus}
        updateProfileImage={updateProfileImage}/>
                <Posts posts={posts} addPost={addPost}/>
        }

}


let mapStateToProps = (state:AppState):MapToStateType => {
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
    connect<MapToStateType,MapToDispatchType,{},AppState>(mapStateToProps,{
        addPost:profileActions.addPost,
        selectUserProfile,
        getProfileStatus,
        updateProfileStatus,
        updateProfileImage,
        updateProfile,
        setFormView
    } ),
    withRouter
)(ProfileContainer);
