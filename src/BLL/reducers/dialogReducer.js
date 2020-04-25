const ADD_MESSAGE='ADD-MESSAGE';

let initData={
    dialogs:[],
    messages:[]
}

const dialogReducer=(state=initData,action)=>{
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



export const    addMessage=(newMessage)=>({type:ADD_MESSAGE,newMessage});



export default dialogReducer;