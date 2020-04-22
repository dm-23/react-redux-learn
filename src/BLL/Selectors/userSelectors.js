
//Simple selectors

import {createSelector} from "reselect";

const getUsersSimpleSelector= state=>state.usersPage.users;

const getCurrentPageSimpleSelector=state=>state.usersPage.currentPage;

const getTotalCountSimpleSelector=state=> state.usersPage.totalCount;

const getUsersOnPageSimpleSelector=state=> state.usersPage.usersOnPage;

const getIsFetchingSimpleSelector=state=> state.usersPage.isFetching;

const getFetchUsersSimpleSelector=state=> state.usersPage.fetchUsers;

//Reselect selectors

export const getUsers=createSelector(getUsersSimpleSelector,users=>users);

export const getCurrentPage=createSelector(getCurrentPageSimpleSelector,page=>page);

export const getTotalCount=createSelector(getTotalCountSimpleSelector,totalCount=>totalCount);

export const getUsersOnPage=createSelector(getUsersOnPageSimpleSelector,usersOnPage=>usersOnPage);

export const getIsFetching=createSelector(getIsFetchingSimpleSelector,isFetch=>isFetch);

export const getFetchUsers=createSelector(getFetchUsersSimpleSelector,fetchUsers=>fetchUsers);
