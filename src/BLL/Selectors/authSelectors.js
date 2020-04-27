import {createSelector} from 'reselect';

//Simple Selectors
const getMeIdSimple=state=>state.auth.id;

const getIsAuthSimple=state=>state.auth.isAuth;

//ReselectSelectors

export const getMeId=createSelector(getMeIdSimple,id=>id);

export const getIsAuth=createSelector(getIsAuthSimple, isAuth=>isAuth);
