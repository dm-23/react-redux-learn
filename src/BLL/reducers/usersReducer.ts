import React from "react";
import baseApiController from "../../API/api";
import {ArrayObjectsRewrite} from "../../Utils/Helpers/user-reducer-helpers";
import {ActionTypes, UserType} from "../../types/types";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux-store";

let initData = {
    users: [] as Array<UserType>,
    currentPage: 1,
    totalCount: 0,
    usersOnPage: 5,
    isFetching: false,
    fetchUsers: [] as Array<number>
}

type InitializedStateType=typeof initData

const actions={
    follow:(userId:number)=> {
        return {type: 'FOLLOW', userId} as const
    },
    unfollow:(userId:number) => {
        return {type: 'UNFOLLOW', userId} as const
    },
    setUsers:(users:Array<UserType>) => {
        return {type: 'SET_USERS', users} as const
    },
    setTotalCount:(count:number) => {
        return {type: 'SET_TOTAL_COUNT', count} as const
    },
    setCurrentPage:(currentPage:number) => {
        return {type: 'SET_CURRENT_PAGE', currentPage} as const
    },
    toggleFetching:(isFetching:boolean) => {
        return {type: 'TOGGLE_FETCHING', isFetching} as const
    },
    setUserFetch:(fetching:boolean, userId:number) => ({type: 'SET_USER_FETCH', fetching, userId} as const)
}

type AcTypes=ActionTypes<typeof actions>

type ThunkCreatorType=ThunkAction<Promise<void>,AppState,unknown,AcTypes>

const usersReducer = (state = initData, action:AcTypes):InitializedStateType => {

    switch (action.type) {

        case 'FOLLOW': {

            let result = {
                ...state,
                users: ArrayObjectsRewrite(state.users,'id',action.userId,{followed: true})
            };
            return result;
        }
        case 'UNFOLLOW': {
            let result = {
                ...state,
                users:ArrayObjectsRewrite(state.users,'id',action.userId,{followed: false})
            };
            return result;
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SET_TOTAL_COUNT': {
            return {
                ...state,
                totalCount: action.count
            }
        }
        case 'TOGGLE_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'SET_USER_FETCH': {
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



export default usersReducer;

export const followSuccess = (userId:number):ThunkCreatorType => async (dispatch) => {
    dispatch(actions.setUserFetch(true, userId));
    const data = await baseApiController.users.setFollow(userId);
    if (data.resultCode === 0) {
        dispatch(actions.follow(userId));
    }
    dispatch(actions.setUserFetch(false, userId));
}

export const unfollowSuccess = (userId:number):ThunkCreatorType => async (dispatch) => {
    dispatch(actions.setUserFetch(true, userId));
    const data = await baseApiController.users.setUnfollow(userId)
    if (data.resultCode === 0) {
        dispatch(actions.unfollow(userId));
    }
    dispatch(actions.setUserFetch(false, userId));
}