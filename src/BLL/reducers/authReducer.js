import baseApiController from "../../API/api";
import {stopSubmit} from "redux-form"

const SET_USER_AUTH = "reducers/auth/SET-USER-AUTH";

let initData = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initData, action) => {

    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.data,

            };
        default:
            return state;
    }
}


const setUserAuth = (id, login, isAuth) => ({type: SET_USER_AUTH, data: {id, login, isAuth}});

export const getUserAuth = () => async (dispatch) => {
    const data = await baseApiController.auth.getMe();
    if (data.resultCode === 0) {
        let {id, login} = data.data;
        dispatch(setUserAuth(id, login, true));
    }
}

export const login = (login, password, rememberMe) => async (dispatch) => {
    const data = await baseApiController.auth.login(login, password, rememberMe, false);
    if (data.resultCode === 0) {
        dispatch(setUserAuth(data.data.userId, login, true));
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Ошибка входа";
        let act = stopSubmit("loginForm", {_error: message});
        dispatch(act);
    }


}

export const logout = () => async (dispatch) => {
    const data = await baseApiController.auth.logout()
    if (data.resultCode === 0) {
        dispatch(setUserAuth(null, null, null));
    }
}


export default authReducer;