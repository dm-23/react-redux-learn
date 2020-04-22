import baseApiController from "../../API/api";
import {stopSubmit} from "redux-form"
import {getUserAuth} from "./authReducer";
const INITIALIZED_SUCCESS="INITIALIZED_SUCCESS";

let initData={
    initialized:false
}

const appReducer=(state=initData,action)=>{

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized:true,
            };
        default:
            return state;
    }
}


const setInitialized=()=>({type:INITIALIZED_SUCCESS});


export const InitializeApp=()=>(dispatch)=>{
        dispatch(getUserAuth()).then(()=>{
            dispatch(setInitialized());
        });
}

export default appReducer;