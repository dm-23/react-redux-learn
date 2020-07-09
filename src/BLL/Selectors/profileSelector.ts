import {createSelector} from 'reselect';
import {AppState} from "../redux-store";

//Simple selectors

    const getPostsSimple=(state:AppState)=>state.profilePage.posts;

    const getProfileSimple=(state:AppState)=>state.profilePage.profile;

    const getStatusSimple=(state:AppState)=>state.profilePage.status;

    const getFormViewModeSimple=(state:AppState)=>state.profilePage.formViewMode;
//Reselect Selector

export const getPosts=createSelector(getPostsSimple,posts=>posts);

export const getProfile=createSelector(getProfileSimple, profile=>profile);

export const getStatus=createSelector(getStatusSimple, status=>status);

export const getFormViewMode=createSelector(getFormViewModeSimple, mode=>mode);

