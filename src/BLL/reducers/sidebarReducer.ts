import {FriendType} from "../../types/types";

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

const sidebarReducer=(state=initData,action:any):InitialStateType=>{
    return state;
};

export default sidebarReducer;