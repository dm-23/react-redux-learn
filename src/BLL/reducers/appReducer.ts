import {ThunkAction} from "redux-thunk";
import {AppState} from "../redux-store";
import {ActionTypes} from "../../types/types";

let initData={
    initialized:false
}

type AcType=ActionTypes<typeof actions>

const actions={
    setInitialized:()=>({type:'INITIALIZED_SUCCESS'})
}

const appReducer=(state=initData,action:AcType):typeof initData=>{

    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized:true,
            };
        default:
            return state;
    }
}



export const InitializeApp=():ThunkAction<Promise<void>,AppState,unknown,AcType>=>async (dispatch)=>{
        await dispatch(actions.setInitialized());

}

export default appReducer;