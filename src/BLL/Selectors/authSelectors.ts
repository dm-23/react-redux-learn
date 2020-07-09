import {createSelector} from 'reselect';
import {AppState} from "../redux-store";

//Simple Selectors
const getMeIdSimple=(state:AppState)=>state.auth.id;

const getIsAuthSimple=(state:AppState)=>state.auth.isAuth;

//ReselectSelectors

export const getMeId=createSelector(getMeIdSimple,id=>id);

export const getIsAuth=createSelector(getIsAuthSimple, isAuth=>isAuth);
