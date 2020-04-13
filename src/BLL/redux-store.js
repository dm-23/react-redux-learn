import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profileReducer";
import dialogReducer from "./reducers/dialogReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import * as React from "react";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import thunkMidleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

let reducers=combineReducers({
    profilePage:profileReducer,
    dialogPage:dialogReducer,
    sideBar:sidebarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form: formReducer
});

let store=createStore(reducers,applyMiddleware(thunkMidleware));

export let StoreContext=React.createContext(null);

export default store;