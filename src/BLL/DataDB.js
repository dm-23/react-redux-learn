import profileReducer from "./reducers/profileReducer";
import dialogReducer from "./reducers/dialogReducer";
import sidebarReducer from "./reducers/sidebarReducer";

let store={
    _state: {
        profilePage:{
            postNewMessage:'',
            posts:[
                {message:'Hello all',
                    id:'1',
                    likeCount:undefined
                },
                {message:'Is anyone here ?',
                    id:'2',
                    likeCount:'15'
                },
                {message:'Next will no message',
                    id:'3',
                    likeCount:'20'
                }
            ],
        },
        dialogPage:{
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

            ],
            newMessageBody:''
        },
        sideBar:{
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

            ]
        }
    },
    _callback(state){},

    getState(){
      return this._state;
    },
    subscribe(observer){
        this._callback=observer;
    },

    dispatch(action){
        this._state.profilePage=profileReducer(this._state.profilePage,action);
        this._state.dialogPage=dialogReducer(this._state.dialogPage,action);
        this._state.sideBar=sidebarReducer(this._state.sideBar,action);
        this._callback(this);
    }

}



export default store;