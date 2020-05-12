import {getUserAuth} from "./authReducer";
const INITIALIZED_SUCCESS="reducers/app/INITIALIZED_SUCCESS";

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


export const InitializeApp=()=>async (dispatch)=>{
        await dispatch(getUserAuth());
        await dispatch(setInitialized());

}

export default appReducer;