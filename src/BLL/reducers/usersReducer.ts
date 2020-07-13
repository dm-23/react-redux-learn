import React from "react";
import baseApiController from "../../API/api";
import {ArrayObjectsRewrite} from "../../Utils/Helpers/user-reducer-helpers";
import {UserType} from "../../types/types";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux-store";


const FOLLOW = 'reducers/users/FOLLOW';
const UNFOLLOW = 'reducers/users/UNFOLLOW';
const SET_USERS = 'reducers/users/SET-USERS';
const SET_CURRENT_PAGE = 'reducers/users/SET-CURRENT-PAGE';
const SET_TOTAL_COUNT = 'reducers/users/SET_TOTAL_COUNT';
const TOGGLE_FETCHING = 'reducers/users/TOGGLE_FETCHING';
const SET_USER_FETCH = 'reducers/users/SET_USER_FETCH';


let initData = {
    users: [] as Array<UserType>,
    currentPage: 1,
    totalCount: 0,
    usersOnPage: 5,
    isFetching: false,
    fetchUsers: [] as Array<number>
}

type InitializedStateType=typeof initData

type ActionCreatorType=FollowActionType | UnfollowActionType | SetUsersActionType
    | SetTotalCountActionType | SetCurrentPageActionType | ToggleFetchingActionType
    | SetUserFetchActionType

type ThunkCreatorType=ThunkAction<Promise<void>,AppState,unknown,ActionCreatorType>

const usersReducer = (state = initData, action:ActionCreatorType):InitializedStateType => {

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

type FollowActionType={
    type:typeof FOLLOW
    userId:number
}
const follow = (userId:number):FollowActionType => {
    return {type: FOLLOW, userId}
}

type UnfollowActionType={
    type:typeof UNFOLLOW
    userId:number
}
const unfollow = (userId:number):UnfollowActionType => {
    return {type: UNFOLLOW, userId}
}

type SetUsersActionType={
    type:typeof SET_USERS
    users:Array<UserType>
}
export const setUsers = (users:Array<UserType>):SetUsersActionType => {
    return {type: SET_USERS, users}
}

type SetTotalCountActionType={
    type: typeof SET_TOTAL_COUNT
    count:number
}
export const setTotalCount = (count:number):SetTotalCountActionType => {
    return {type: SET_TOTAL_COUNT, count}
}

type SetCurrentPageActionType={
    type:typeof SET_CURRENT_PAGE,
    currentPage:number
}
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

type ToggleFetchingActionType={
    type:typeof TOGGLE_FETCHING
    isFetching:boolean
}
export const toggleFetching = (isFetching:boolean):ToggleFetchingActionType => {
    return {type: TOGGLE_FETCHING, isFetching}
}

type SetUserFetchActionType={
    type:typeof SET_USER_FETCH
    fetching:boolean
    userId:number
}
export const setUserFetch = (fetching:boolean, userId:number):SetUserFetchActionType => ({type: SET_USER_FETCH, fetching, userId});

export default usersReducer;

export const followSuccess = (userId:number):ThunkCreatorType => async (dispatch) => {
    dispatch(setUserFetch(true, userId));
    const data = await baseApiController.users.setFollow(userId);
    if (data.resultCode === 0) {
        dispatch(follow(userId));
    }
    dispatch(setUserFetch(false, userId));
}

export const unfollowSuccess = (userId:number):ThunkCreatorType => async (dispatch) => {
    dispatch(setUserFetch(true, userId));
    const data = await baseApiController.users.setUnfollow(userId)
    if (data.resultCode === 0) {
        dispatch(unfollow(userId));
    }
    dispatch(setUserFetch(false, userId));
}