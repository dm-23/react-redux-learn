import baseApiController from "../../API/api";
import {stopSubmit, FormAction} from "redux-form"
import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux-store";

const SET_USER_AUTH = "reducers/auth/SET-USER-AUTH";
const GET_CAPTCHA = "reducers/auth/GET_CAPTCHA";

let initData = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl:null as string | null
}

let InitStateType=typeof initData

type ActionCreatorsTypes=SetUserAuthActionType | GetCaptchaActionType

const authReducer = (state = initData, action:ActionCreatorsTypes) => {

    switch (action.type) {
        case SET_USER_AUTH:
        case GET_CAPTCHA:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

type SetUserAuthActionType={
    type:typeof SET_USER_AUTH
    data:{
        id:number | null
        login:string | null
        isAuth:boolean | null
    }
}
type ThunkCreatorType=ThunkAction<Promise<void>,AppState,unknown,ActionCreatorsTypes | FormAction>

const setUserAuth = (id:number | null, login:string | null, isAuth:boolean | null):SetUserAuthActionType => ({type: SET_USER_AUTH, data: {id, login, isAuth}});
type GetCaptchaActionType={
    type:typeof GET_CAPTCHA,
    data:{
        captchaUrl:string
    }
}
const getCaptcha = (captchaUrl:string):GetCaptchaActionType => ({type: GET_CAPTCHA, data: {captchaUrl}});

export const getUserAuth = ():ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.auth.getMe();
    if (data.resultCode === 0) {
        let {id, login} = data.data;
        dispatch(setUserAuth(id, login, true));
    }
}

export const getCaptchaUrl=():ThunkCreatorType=>async (dispatch)=>{
    const data = await baseApiController.security.getCaptcha();
    dispatch(getCaptcha(data.url));
}

export const login = (login:string, password:string, rememberMe:boolean,captcha:string | null=null ):ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.auth.login(login, password, rememberMe,captcha );
    if (data.resultCode === 0) {
        dispatch(setUserAuth(data.data.userId, login, true));
    } else {
        if(data.resultCode === 10){
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Ошибка входа";
        let act = stopSubmit("loginForm", {_error: message});
        dispatch(act);
    }


}

export const logout = ():ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.auth.logout()
    if (data.resultCode === 0) {
        dispatch(setUserAuth(null, null, null));
    }
}


export default authReducer;