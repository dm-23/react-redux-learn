import {getUserAuth} from "./authReducer";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux-store";
const INITIALIZED_SUCCESS="reducers/app/INITIALIZED_SUCCESS";

let initData={
    initialized:false
}

export type AppStateType=typeof initData
type ActionCreatorsType=SetInitializedActionType

const appReducer=(state=initData,action:ActionCreatorsType):AppStateType=>{

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


export const InitializeApp=():ThunkAction<Promise<void>,AppState,unknown,ActionCreatorsType>=>async (dispatch)=>{
        //await dispatch(getUserAuth());
        await dispatch(setInitialized());

}

export default appReducer;