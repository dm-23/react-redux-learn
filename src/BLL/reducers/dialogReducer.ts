import {ActionTypes, DialogType, MessageType} from "../../types/types";

let initData={
    dialogs:[] as Array<DialogType>,
    messages:[]  as Array<MessageType>
}

type InitialStateType=typeof initData
const actions={
    addMessage:(newMessage:string)=>({type:'ADD_MESSAGE',newMessage} as const)
}
type AcTypes=ActionTypes<typeof actions>

const dialogReducer=(state=initData,action:AcTypes):InitialStateType=>{
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages,{id:99,
                    message:action.newMessage
                }]
            };
        default:
            return state;
    }
}


export default dialogReducer;