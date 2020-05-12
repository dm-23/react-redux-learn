import React from "react";
import baseApiController from "../../API/api";
import {ArrayObjectsRewrite} from "../../Utils/Helpers/user-reducer-helpers";


const FOLLOW = 'reducers/users/FOLLOW';
const UNFOLLOW = 'reducers/users/UNFOLLOW';
const SET_USERS = 'reducers/users/SET-USERS';
const SET_CURRENT_PAGE = 'reducers/users/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'reducers/users/SET_TOTAL_COUNT';
const TOGGLE_FETCHING = 'reducers/users/TOGGLE_FETCHING';
const SET_USER_FETCH = 'reducers/users/SET_USER_FETCH';


let initData = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    usersOnPage: 5,
    isFetching: false,
    fetchUsers: []
}

const usersReducer = (state = initData, action) => {

    switch (action.type) {

        case FOLLOW: {

            let result = {
                ...state,
                users: ArrayObjectsRewrite(state.users,'id',action.userId,{followed: true})
            };
            return result;
        }
        case UNFOLLOW: {
            let result = {
                ...state,
                users:ArrayObjectsRewrite(state.users,'id',action.userId,{followed: false})
            };
            return result;
        }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.count
            }
        }
        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_USER_FETCH: {
            return {
                ...state,
                fetchUsers: action.fetching ? [...state.fetchUsers, action.userId] :
                    state.fetchUsers.filter(el => el !== action.userId)
            }
        }
        default:
            return state;
    }
}

const follow = (userId) => {
    return {type: FOLLOW, userId}
}


const unfollow = (userId) => {
    return {type: UNFOLLOW, userId}
}

export const setUsers = (users) => {
    return {type: SET_USERS, users}
}

export const setTotalCount = (count) => {
    return {type: SET_TOTAL_COUNT, count}
}

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const toggleFetching = (isFetching) => {
    return {type: TOGGLE_FETCHING, isFetching}
}

export const setUserFetch = (fetching, userId) => ({type: SET_USER_FETCH, fetching, userId});

export default usersReducer;

export const followSuccess = (userId) => async dispatch => {
    dispatch(setUserFetch(true, userId));
    const data = await baseApiController.users.setFollow(userId);
    if (data.resultCode === 0) {
        dispatch(follow(userId));
    }
    dispatch(setUserFetch(false, userId));
}

export const unfollowSuccess = (userId) => async (dispatch) => {
    dispatch(setUserFetch(true, userId));
    const data = await baseApiController.users.setUnfollow(userId)
    if (data.resultCode === 0) {
        dispatch(unfollow(userId));
    }
    dispatch(setUserFetch(false, userId));
}