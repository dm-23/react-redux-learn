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

type ActionCreatorType={

}

const sidebarReducer=(state=initData,action:ActionCreatorType):InitialStateType=>{
    return state;
};

export default sidebarReducer;