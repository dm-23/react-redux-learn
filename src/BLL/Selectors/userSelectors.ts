
//Simple selectors

import {createSelector} from "reselect";
import {AppState} from "../redux-store";

const getUsersSimpleSelector= (state:AppState)=>state.usersPage.users;

const getCurrentPageSimpleSelector=(state:AppState)=>state.usersPage.currentPage;

const getTotalCountSimpleSelector=(state:AppState)=> state.usersPage.totalCount;

const getUsersOnPageSimpleSelector=(state:AppState)=> state.usersPage.usersOnPage;

const getIsFetchingSimpleSelector=(state:AppState)=> state.usersPage.isFetching;

const getFetchUsersSimpleSelector=(state:AppState)=> state.usersPage.fetchUsers;

//Reselect selectors

export const getUsers=createSelector(getUsersSimpleSelector,users=>users);

export const getCurrentPage=createSelector(getCurrentPageSimpleSelector,page=>page);

export const getTotalCount=createSelector(getTotalCountSimpleSelector,totalCount=>totalCount);

export const getUsersOnPage=createSelector(getUsersOnPageSimpleSelector,usersOnPage=>usersOnPage);

export const getIsFetching=createSelector(getIsFetchingSimpleSelector,isFetch=>isFetch);

export const getFetchUsers=createSelector(getFetchUsersSimpleSelector,fetchUsers=>fetchUsers);
