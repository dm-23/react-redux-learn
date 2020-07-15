import baseApiController from "../../API/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotoType, PostType, ProfileType, ActionTypes} from "../../types/types";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux-store";


let initData = {
    posts: [] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    formViewMode: false,
    postNewMessage: ''
}

type InitializeStateType=typeof initData
const actions={
    addPost:(newPost:string) => ({type: 'ADD_POST', newPost} as const),
    selectProfile:(profile:ProfileType) => ({type: 'SELECT_USER_PROFILE', profile} as const),
    setProfileState:(status:string) => ({type: 'SET_PROFILE_STATE', status} as const),
    setProfilePhoto:(photos:PhotoType) => ({type: 'SET_PROFILE_PHOTO', photos} as const),
    setProfileFormView:(value:boolean) => ({type: 'SET_PROFILE_FORM_VIEW', value} as const)
}

type AcTypes=ActionTypes<typeof actions>

type ThunkCreatorType=ThunkAction<Promise<void>,AppState,unknown,AcTypes | FormAction>

const profileReducer = (state = initData, action:AcTypes):InitializeStateType => {

    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts as Array<PostType>,{
                    message: action.newPost,
                    id: 99,
                    likeCount: 0
                } ],
                postNewMessage: ''
            };

        case 'SELECT_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'SET_PROFILE_STATE':
            return {
                ...state,
                status: action.status
            };
        case 'SET_PROFILE_PHOTO':
            return {
                ...state,
                profile: {...state.profile as ProfileType, photos: action.photos as PhotoType}
            }
        case 'SET_PROFILE_FORM_VIEW':
            return {
                ...state,
                formViewMode: action.value
            }
        default:
            return state;
    }
}



export const selectUserProfile = (profileId:number):ThunkCreatorType => async (dispatch) => {
    if (profileId) {
        const data = await baseApiController.users.getProfile(profileId);
        dispatch(actions.selectProfile(data));
    }
}

export const getProfileStatus = (profileId:number):ThunkCreatorType => async (dispatch) => {
    if (profileId) {
        const data = await baseApiController.users.getProfileStatus(profileId);
        dispatch(actions.setProfileState(data));
    }
}

export const updateProfileStatus = (newStatus:string):ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.users.putStatus(newStatus);
    if (data.resultCode === 0) {
        dispatch(actions.setProfileState(newStatus));
    }
}
export const updateProfileImage = (file:any):ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.users.putProfilePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.setProfilePhoto(data.data.photos));
    }
}

export const updateProfile = (values:ProfileType):ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.users.putProfile(values);
    if (data.resultCode === 0) {
        dispatch(selectUserProfile(values.userId));
        //Все успешно, закрываем форму
        dispatch(actions.setProfileFormView(false));
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

export const setFormView = (value:boolean):ThunkAction<void,AppState,unknown,AcTypes> => (dispatch) => {
    dispatch(actions.setProfileFormView(value));
}

export default profileReducer;