import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./reducers/profileReducer";
import dialogReducer from "./reducers/dialogReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import * as React from "react";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import thunkMidleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./reducers/appReducer";

let reducers=combineReducers({
    profilePage:profileReducer,
    dialogPage:dialogReducer,
    sideBar:sidebarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form: formReducer,
    app:appReducer

});
//Подключение расширения для реакт в браузер хром
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Наш стор
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMidleware)
    ));
//let store=createStore(reducers,applyMiddleware(thunkMidleware));
window.state=store;
//Наш стор
export default store;