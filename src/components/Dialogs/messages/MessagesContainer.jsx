import React from "react";

import {addMessage} from "../../../BLL/reducers/dialogReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import withAuthRedirect from "../../../Hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const functionState=(state)=>{
    return {
        messages:state.dialogPage.messages,
    }
};



//props has got a store
const MessagesContainer=compose(connect(functionState, {
    addMessage
}), withRouter,withAuthRedirect)(Messages);


export default MessagesContainer;