import React from "react";
import Posts from "./Posts/Posts"
import Profile from "./Profile"
import {connect} from "react-redux";
import {addPost, selectProfile, selectUserProfile, updateProfileStatus} from "../../BLL/reducers/profileReducer";
import {Redirect, withRouter} from "react-router-dom";
import withAuthRedirect from "../../Hoc/withAuthRedirect";
import {compose} from "redux"

class ProfileContainer extends React.Component {

    componentDidMount() {
        let profileId = this.props.match.params.profileId;
        if(profileId===undefined)
            profileId=this.props.meId || 2;
        this.props.selectUserProfile(profileId);
    }

    render() {
        return <>
            <Profile profile={this.props.profile} status={this.props.status} updateProfileStatus={this.props.updateProfileStatus}/>
            <Posts posts={this.props.posts} addPost={this.props.addPost}/>
        </>
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        postNewMessage: state.profilePage.postNewMessage,
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status:state.profilePage.status,
        meId:state.auth.id
    }
};




export default compose(
    connect(mapStateToProps, {
        addPost,
        selectUserProfile,
        updateProfileStatus
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
