import {DialogType, MessageType} from "../../types/types";
const ADD_MESSAGE='reducers/dialog/ADD-MESSAGE';

let initData={
    dialogs:[] as Array<DialogType>,
    messages:[]  as Array<MessageType>
}

type InitialStateType=typeof initData

type ActionCreatorsType=AddMessageType

const dialogReducer=(state=initData,action:ActionCreatorsType):InitialStateType=>{
    switch (action.type) {
        case ADD_MESSAGE:
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
type AddMessageType={
    type:typeof ADD_MESSAGE
    newMessage:string
}
export const addMessage=(newMessage:string):AddMessageType=>({type:ADD_MESSAGE,newMessage});

export default dialogReducer;