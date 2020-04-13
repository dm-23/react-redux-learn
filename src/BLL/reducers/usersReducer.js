import React from "react";
import baseApiController from "../../API/api";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE='SET-CURRENT-PAGE';
const SET_TOTAL_COUNT='SET_TOTAL_COUNT';
const TOGGLE_FETCHING='TOGGLE_FETCHING';
const SET_USER_FETCH='SET_USER_FETCH';


let initData = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    usersOnPage:5,
    isFetching:false,
    fetchUsers:[]
}

const usersReducer = (state = initData, action) =>{

    switch (action.type) {

        case FOLLOW:{

            let result={
                ...state,
                users:state.users.map((u)=>{
                    if(u.id==action.userId){
                        return {
                            ...u,
                            followed:true
                        }
                    }
                    return u;
                })
            };
            return result;
        }
        case UNFOLLOW:{
            let result={
                ...state,
                users:[...state.users.map((u)=>{
                    if(u.id==action.userId){
                        return {
                            ...u,
                            followed:false
                        }
                    }
                    return u;
                })]
            };
            return result;
        }
        case SET_USERS:{
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE:{
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_COUNT:{
            return {
                ...state,
                totalCount: action.count
            }
        }
        case TOGGLE_FETCHING:{
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_USER_FETCH:{
            return {
                ...state,
                fetchUsers: action.fetching ? [...state.fetchUsers,action.userId]:
                    state.fetchUsers.filter(el=>el!==action.userId)
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

export const toggleFetching=(isFetching)=>{
    return {type:TOGGLE_FETCHING,isFetching}
}

export const setUserFetch=(fetching, userId)=>({type:SET_USER_FETCH,fetching,userId});

export default usersReducer;

export const followSuccess=(userId)=>{
    return (dispatch)=>{
        dispatch(setUserFetch(true,userId));
        baseApiController.users.setFollow(userId).then(data=>{
            if(data.resultCode===0){
                dispatch(follow(userId));
            }
            dispatch(setUserFetch(false,userId));
        })
    }
}

export const unfollowSuccess=(userId)=>{
    return (dispatch)=>{
        dispatch(setUserFetch(true,userId));
        baseApiController.users.setUnfollow(userId).then(data=>{
            if(data.resultCode===0){
                dispatch(unfollow(userId));
            }
            dispatch(setUserFetch(false,userId));
        });
    }
}