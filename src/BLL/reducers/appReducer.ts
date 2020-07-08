import {getUserAuth} from "./authReducer";
const INITIALIZED_SUCCESS="reducers/app/INITIALIZED_SUCCESS";

let initData={
    initialized:false
}

type InitialStateType=typeof initData

const appReducer=(state=initData,action:any)=>{

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

type SetInitializedActionType={
    type:typeof INITIALIZED_SUCCESS
}
const setInitialized=():SetInitializedActionType=>({type:INITIALIZED_SUCCESS});


export const InitializeApp=()=>async (dispatch:any)=>{
        await dispatch(getUserAuth());
        await dispatch(setInitialized());

}

export default appReducer;