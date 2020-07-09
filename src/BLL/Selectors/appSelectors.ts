import {createSelector} from 'reselect'
import {AppState} from "../redux-store";

//Simple selectors
const getAppInitializeSimple=(state:AppState)=>{
    return state.app.initialized;
};


//export selectors
export const  getAppInitialize=createSelector(getAppInitializeSimple,init=>init);