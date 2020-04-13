const ADD_MESSAGE='ADD-MESSAGE';

let initData={
    dialogs:[
        {
            userId:"1",
            userName:"Dmitry",
            userActive:'True'
        },
        {
            userId:"2",
            userName:"Ivan",
            userActive:''
        },
        {
            userId:"3",
            userName:"Peter",
            userActive:''
        },
        {
            userId:"4",
            userName:"John",
            userActive:''
        },
        {
            userId:"5",
            userName:"Andre",
            userActive:''
        },
        {
            userId:"6",
            userName:"Michale",
            userActive:''
        }

    ],
    messages:[
        {
            id:'1',
            message:'Hello'
        },
        {
            id:'2',
            message:'How\'re you ?'
        },
        {
            id:'3',
            message:'Fine, thanks, and you ?'
        },
        {
            id:'4',
            message:'I\'m ok. Where have you gone ?'
        },
        {
            id:'5',
            message:'O, i\'m gonna come in to shop'
        },
        {
            id:'6',
            message:'Mmm, ok, good luck!'
        }

    ]
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