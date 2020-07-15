import {ActionTypes, FriendType} from "../../types/types";

let initData={
    friends:[
        {
            id:'1',
            name:'Ivan'
        },
        {
            id:'2',
            name:'Andry'
        },
        {
            id:'3',
            name:'John'
        },
    ] as Array<FriendType>
};

type InitialStateType=typeof initData

const actions={}

type AcTypes=ActionTypes<typeof actions>

const sidebarReducer=(state=initData,action:AcTypes):InitialStateType=>{
    return state;
};

export default sidebarReducer;