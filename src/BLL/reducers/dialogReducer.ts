import {ActionTypes, DialogType, MessageType} from "../../types/types";

let initData={
    dialogs:[] as Array<DialogType>,
    messages:[]  as Array<MessageType>
}

type InitialStateType=typeof initData

export const dialogActions={
    addMessage:(newMessage:string)=>({type:'ADD_MESSAGE',newMessage} as const)
}
export type DialogActionTypes=ActionTypes<typeof dialogActions>

const dialogReducer=(state=initData,action:DialogActionTypes):InitialStateType=>{
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