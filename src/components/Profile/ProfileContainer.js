import React, {useEffect} from "react";
import Posts from "./Posts/Posts"
import Profile from "./Profile"
import {connect} from "react-redux";
import {addPost, selectProfile, selectUserProfile, updateProfileStatus} from "../../BLL/reducers/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import withAuthRedirect from "../../Hoc/withAuthRedirect";
import {compose} from "redux"

const ProfileContainer=props=>{

    useEffect(()=>{
        let profileId = props.match.params.profileId;
        if(profileId===undefined)
            profileId=props.meId;
        props.selectUserProfile(profileId);
    },[props.match.params.profileId,props.meId,props.status])

    if(!props.isAuth && !props.match.params.profileId){
        return <Redirect to={"/login"}/>
    }
    return <>
        <Profile profile={props.profile} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
        <Posts posts={props.posts} addPost={props.addPost}/>
    </>
}


let mapStateToProps = (state, ownProps) => {
    return {
        postNewMessage: state.profilePage.postNewMessage,
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
        updateProfileStatus
    }),
    withRouter
)(ProfileContainer);
