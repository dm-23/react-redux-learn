import {createSelector} from 'reselect';

//Simple selectors

    const getPostsSimple=(state)=>state.profilePage.posts;

    const getProfileSimple=state=>state.profilePage.profile;

    const getStatusSimple=state=>state.profilePage.status;

    const getFormViewModeSimple=state=>state.profilePage.formViewMode;
//Reselect Selector

export const getPosts=createSelector(getPostsSimple,posts=>posts);

export const getProfile=createSelector(getProfileSimple, profile=>profile);

export const getStatus=createSelector(getStatusSimple, status=>status);

export const getFormViewMode=createSelector(getFormViewModeSimple, mode=>mode);

