import baseApiController from "../../API/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "reducers/profile/ADD-POST";
const SELECT_USER_PROFILE = "reducers/profile/SELECT-USER-PROFILE";
const SET_PROFILE_STATE = "reducers/profile/SET_PROFILE_STATE";
const SET_PROFILE_PHOTO = "reducers/profile/SET_PROFILE_PHOTO";
const SET_PROFILE_FORM_VIEW = "reducers/profile/SET_PROFILE_FORM_VIEW";


let initData = {
    posts: [],
    profile: null,
    status: '',
    formViewMode: false
}

const profileReducer = (state = initData, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    message: action.newPost,
                    id: '99',
                    likeCount: '0'
                }],
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
                profile: {...state.profile, photos: action.photos}
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


export const addPost = (newPost) => ({type: ADD_POST, newPost});

const selectProfile = (profile) => ({type: SELECT_USER_PROFILE, profile});

const setProfileState = (status) => ({type: SET_PROFILE_STATE, status});

const setProfilePhoto = (photos) => ({type: SET_PROFILE_PHOTO, photos});

const setProfileFormView = (value) => ({type: SET_PROFILE_FORM_VIEW, value});


export const selectUserProfile = (profileId) => async (dispatch) => {
    if (profileId) {
        const data = await baseApiController.users.getProfile(profileId);
        dispatch(selectProfile(data));
    }
}

export const getProfileStatus = (profileId) => async dispatch => {
    if (profileId) {
        const data = await baseApiController.users.getProfileStatus(profileId);
        dispatch(setProfileState(data));
    }
}

export const updateProfileStatus = (newStatus) => async (dispatch) => {
    const data = await baseApiController.users.putStatus(newStatus);
    if (data.resultCode === 0) {
        dispatch(setProfileState(newStatus));
    }
}
export const updateProfileImage = (file) => async (dispatch) => {
    const data = await baseApiController.users.putProfilePhoto(file);
    if (data.resultCode === 0) {
        dispatch(setProfilePhoto(data.data.photos));
    }
}

export const updateProfile = (values) => async (dispatch) => {
    const data = await baseApiController.users.putProfile(values);
    if (data.resultCode === 0) {
        dispatch(selectUserProfile(values.userId));
        //Все успешно, закрываем форму
        dispatch(setProfileFormView(false));
    } else {
        let err = data.messages;
        let parce = {_error: ''};
        if (err && err.length > 0) {
            err.map(e => {
                const reg = /([\w\s]+)\((\w+)->(\w+)\)/;
                const mt = e.match(reg);
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

export const setFormView = (value) => (dispatch) => {
    dispatch(setProfileFormView(value));
}

export default profileReducer;