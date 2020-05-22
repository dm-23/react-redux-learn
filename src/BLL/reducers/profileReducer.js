import baseApiController from "../../API/api";

const ADD_POST = "reducers/profile/ADD-POST";
const SELECT_USER_PROFILE = "reducers/profile/SELECT-USER-PROFILE";
const SET_PROFILE_STATE = "reducers/profile/SET_PROFILE_STATE";
const SET_PROFILE_PHOTO="reducers/profile/SET_PROFILE_PHOTO";

let initData = {
    posts: [],
    profile: null,
    status: ''
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
                profile:{...state.profile,photos:action.photos}
            }
        default:
            return state;
    }
}


export const addPost = (newPost) => ({type: ADD_POST, newPost});

const selectProfile = (profile) => ({type: SELECT_USER_PROFILE, profile});

const setProfileState = (status) => ({type: SET_PROFILE_STATE, status});

const setProfilePhoto = (photos) => ({type: SET_PROFILE_PHOTO, photos});


export const selectUserProfile = (profileId) => async (dispatch) => {
    if(profileId){
        const data = await baseApiController.users.getProfile(profileId);
        dispatch(selectProfile(data));
    }
}

export const getProfileStatus = (profileId) => async dispatch => {
    if(profileId){
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
export default profileReducer;