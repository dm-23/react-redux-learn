import {createSelector} from 'reselect'

//Simple selectors
const getAppInitializeSimple=state=>{
    return state.app.initialized;
};


//export selectors
export const  getAppInitialize=createSelector(getAppInitializeSimple,init=>init);