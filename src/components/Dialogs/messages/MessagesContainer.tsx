import React from "react";

import {addMessage} from "../../../BLL/reducers/dialogReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import withAuthRedirect from "../../../Hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { AppState } from "../../../BLL/redux-store";
import {MessageType} from "../../../types/types";

type MapToStateType={
    messages:Array<MessageType>
}

type DispatchType={
    addMessage:(newMessage:string)=>void
}

export type PropsType=MapToStateType & DispatchType

const mapStateToProps=(state:AppState):MapToStateType=>{
    return {
        messages:state.dialogPage.messages,
    }
};



const MessagesContainer= compose(connect<MapToStateType, DispatchType, {}, AppState>(mapStateToProps, {
    addMessage
}), withRouter, withAuthRedirect)(Messages);

export default MessagesContainer;


