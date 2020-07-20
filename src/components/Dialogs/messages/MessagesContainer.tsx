import React from "react";

import Messages from "./Messages";
import {connect} from "react-redux";
import withAuthRedirect from "../../../Hoc/withAuthRedirect";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { AppState } from "../../../BLL/redux-store";
import {MessageType} from "../../../types/types";
import {dialogActions} from "../../../BLL/reducers/dialogReducer";

type MapToStateType={
    messages:Array<MessageType>
}

type DispatchType={
    addMessage:(message:string)=>void
}

export type PropsType=MapToStateType & DispatchType

const mapStateToProps=(state:AppState):MapToStateType=>{
    return {
        messages:state.dialogPage.messages,
    }
};


const MessagesContainer= compose(connect<MapToStateType, DispatchType, {}, AppState>(mapStateToProps, {
    addMessage:dialogActions.addMessage
}), withRouter, withAuthRedirect)(Messages);

export default MessagesContainer;


