import baseApiController from "../../API/api";
import {stopSubmit} from "redux-form";
import {PhotoType, PostType, ProfileType} from "../../types/types";

const ADD_POST = "reducers/profile/ADD-POST";
const SELECT_USER_PROFILE = "reducers/profile/SELECT-USER-PROFILE";
const SET_PROFILE_STATE = "reducers/profile/SET_PROFILE_STATE";
const SET_PROFILE_PHOTO = "reducers/profile/SET_PROFILE_PHOTO";
const SET_PROFILE_FORM_VIEW = "reducers/profile/SET_PROFILE_FORM_VIEW";

let initData = {
    posts: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    formViewMode: false,
    postNewMessage: ''
}

type InitializeStateType=typeof initData

const profileReducer = (state = initData, action:any):InitializeStateType => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts as Array<PostType>,{
                    message: action.newPost,
                    id: 99,
                    likeCount: 0
                } ],
                postNewMessage: ''
            };

        case SELECT_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_PROFILE_STATE:
            return {
                ...state,
                status: action.status
            };
        case SET_PROFILE_PHOTO:
            return {
                ...state,
                profile: {...state.profile as ProfileType, photos: action.photos as PhotoType}
            }
        case SET_PROFILE_FORM_VIEW:
            return {
                ...state,
                formViewMode: action.value
            }
        default:
            return state;
    }
}

type AddPostActionType={
    type: typeof ADD_POST
    newPost:string
}
export const addPost = (newPost:string):AddPostActionType => ({type: ADD_POST, newPost});

type SelectProfileActionType={
    type: typeof SELECT_USER_PROFILE
    profile:ProfileType
}
const selectProfile = (profile:ProfileType):SelectProfileActionType => ({type: SELECT_USER_PROFILE, profile});

type SetProfileStateActionType={
    type:typeof SET_PROFILE_STATE,
    status:string
}
const setProfileState = (status:string):SetProfileStateActionType => ({type: SET_PROFILE_STATE, status});

type SetProfilePhotoActionType={
    type:typeof SET_PROFILE_PHOTO,
    photos:PhotoType
}
const setProfilePhoto = (photos:PhotoType):SetProfilePhotoActionType => ({type: SET_PROFILE_PHOTO, photos});

type SetProfileFormViewActionType={
    type:typeof SET_PROFILE_FORM_VIEW,
    value:boolean
}
const setProfileFormView = (value:boolean):SetProfileFormViewActionType => ({type: SET_PROFILE_FORM_VIEW, value});


export const selectUserProfile = (profileId:number) => async (dispatch:any) => {
    if (profileId) {
        const data = await baseApiController.users.getProfile(profileId);
        dispatch(selectProfile(data));
    }
}

export const getProfileStatus = (profileId:number) => async (dispatch:any) => {
    if (profileId) {
        const data = await baseApiController.users.getProfileStatus(profileId);
        dispatch(setProfileState(data));
    }
}

export const updateProfileStatus = (newStatus:string) => async (dispatch:any) => {
    const data = await baseApiController.users.putStatus(newStatus);
    if (data.resultCode === 0) {
        dispatch(setProfileState(newStatus));
    }
}
export const updateProfileImage = (file:any) => async (dispatch:any) => {
    const data = await baseApiController.users.putProfilePhoto(file);
    if (data.resultCode === 0) {
        dispatch(setProfilePhoto(data.data.photos));
    }
}

export const updateProfile = (values:ProfileType) => async (dispatch:any) => {
    const data = await baseApiController.users.putProfile(values);
    if (data.resultCode === 0) {
        dispatch(selectUserProfile(values.userId));
        //Все успешно, закрываем форму
        dispatch(setProfileFormView(false));
    } else {
        let err = data.messages;
        let parce = {_error: ''} as any;
        if (err && err.length > 0) {
            err.map((e:any) => {
                const reg = /([\w\s]+)\((\w+)->(\w+)\)/;
                const mt = e.match(reg) as Array<string>;
                if (mt) {
                    let key = mt[2] + "." + mt[3];
                    if(!(mt[2].toLowerCase() in parce)){
                        parce[mt[2].toLowerCase()]={};
                    }
                    parce[mt[2].toLowerCase()][mt[3].toLowerCase()] = mt[1];
                } else {
                    parce._error = e;
                }
            });
        }
        console.log(parce);
        const act = stopSubmit("editProfileForm", parce);
        dispatch(act);
    }
}

export const setFormView = (value:boolean) => (dispatch:any) => {
    dispatch(setProfileFormView(value));
}

export default profileReducer;