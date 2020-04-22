import baseApiController from "../../API/api";
import {stopSubmit} from "redux-form"
const SET_USER_AUTH="SET-USER-AUTH";

let initData={
    id:null,
    login:null,
    email:null,
    isAuth:false
}

const authReducer=(state=initData,action)=>{

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


const setUserAuth=(id,login,isAuth)=>({type:SET_USER_AUTH,data:{id,login,isAuth}});

export const getUserAuth=()=>(dispatch)=>{
        return baseApiController.auth.getMe().then(data=>{
            if(data.resultCode===0){
                let {id,login}=data.data;
                dispatch(setUserAuth(id,login,true));
            }
        });

}

export const login=(login,password,rememberMe)=>{
    return (dispatch)=>{
        baseApiController.auth.login(login,password,rememberMe,false).then(data=>{

            if(data.resultCode===0){
                dispatch(setUserAuth(data.userId,login,true));
            }
            else{
                let message=data.messages.length>0 ? data.messages[0]:"Ошибка входа";
                let act=stopSubmit("loginForm",{_error:message});
                dispatch(act);
            }
        });
    }
}

export const logout=()=>{
    return (dispatch)=>{
        baseApiController.auth.logout().then(data=>{
            if(data.resultCode===0){
                dispatch(setUserAuth(null,null,null));
            }
        });
    }
}


export default authReducer;