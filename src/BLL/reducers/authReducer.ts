import baseApiController from "../../API/api";
import {stopSubmit, FormAction} from "redux-form"
import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux-store";
import { ActionTypes } from "../../types/types";

let initData = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl:null as string | null
}

const actions={
    setUserAuth:(id:number | null, login:string | null, isAuth:boolean | null) => ({type: 'SET_USER_AUTH', data:{id, login, isAuth}} as const),
    getCaptcha:(captchaUrl:string) => ({type: 'GET_CAPTCHA', data:{captchaUrl}} as const)

}
type InitStateType=typeof initData
type AcTypes=ActionTypes<typeof actions>

const authReducer = (state = initData, action:AcTypes):InitStateType => {

    switch (action.type) {
        case 'SET_USER_AUTH':
        case 'GET_CAPTCHA':
            return {
                ...state,
                ...action.data
            } as InitStateType;
        default:
            return state;
    }
}


type ThunkCreatorType=ThunkAction<Promise<void>,AppState,unknown,AcTypes | FormAction>


export const getUserAuth = ():ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.auth.getMe();
    if (data.resultCode === 0) {
        let {id, login} = data.data;
        dispatch(actions.setUserAuth(id, login, true));
    }
}

export const getCaptchaUrl=():ThunkCreatorType=>async (dispatch)=>{
    const data = await baseApiController.security.getCaptcha();
    dispatch(actions.getCaptcha(data.url));
}

export const login = (login:string, password:string, rememberMe:boolean,captcha:string | null=null ):ThunkCreatorType => async (dispatch) => {
    const data = await baseApiController.auth.login(login, password, rememberMe,captcha );
    if (data.resultCode === 0) {
        dispatch(actions.setUserAuth(data.data.userId, login, true));
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
        dispatch(actions.setUserAuth(null, null, null));
    }
}


export default authReducer;