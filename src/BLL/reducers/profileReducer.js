import baseApiController from "../../API/api";

const ADD_POST="ADD-POST";
const SELECT_USER_PROFILE=  "SELECT-USER-PROFILE";
const SET_PROFILE_STATE="SET_PROFILE_STATE";

let initData={
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
    profile: null,
    status:''
}

const profileReducer=(state=initData,action)=>{

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts:[...state.posts,{message:action.newPost,
                    id:'99',
                    likeCount:'0'
                }],
                postNewMessage:''
            };

        case SELECT_USER_PROFILE:
            return {
                ...state,
                profile:action.profile
            };
        case SET_PROFILE_STATE:
            return {
                ...state,
                status:action.status
            };

        default:
            return state;
    }
}


export const addPost=(newPost)=>({type:ADD_POST,newPost});

const selectProfile=(profile)=>({type:SELECT_USER_PROFILE,profile});

const setProfileState=(status)=>({type:SET_PROFILE_STATE,status});


export const selectUserProfile=(profileId)=>{
    return (dispath)=>{
        baseApiController.users.getProfile(profileId).then(data => {
            dispath(selectProfile(data));
        });
        baseApiController.users.getProfileStatus(profileId).then(data=>{
            dispath(setProfileState(data));
        })
    }
}

export const updateProfileStatus=(newStatus)=>{
    return (dispatch)=>{
        baseApiController.users.putStatus(newStatus).then(data => {
            debugger;
            if(data.resultCode===0){
                dispatch(setProfileState(newStatus));
            }
        });
    }
}

export default profileReducer;