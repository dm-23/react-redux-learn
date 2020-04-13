
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

    ]
}

const sidebarReducer=(state=initData,action)=>{
    return state;
}

export default sidebarReducer;