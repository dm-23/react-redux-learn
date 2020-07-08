const ADD_MESSAGE='reducers/dialog/ADD-MESSAGE';

type Dialog={
    id:number
    dialog:string
}
type Message={
    id:number
    message:string
}

let initData={
    dialogs:[] as Array<Dialog>,
    messages:[]  as Array<Message>
}

const dialogReducer=(state=initData,action:any)=>{
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,{id:'99',
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