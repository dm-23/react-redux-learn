import React from "react";
import {connect} from "react-redux";
import Dialog from "./Dialog";
import {DialogType} from "../../../types/types";
import {AppState} from "../../../BLL/redux-store";

type PropsType={
    dialogs:Array<DialogType>
}

const DialogPage=({dialogs}:PropsType)=>{
    return <div>
        {dialogs.map((el)=><Dialog userName={el.userName} userId={el.userId}/>)}
    </div>

}

const mapStateToProps = (state:AppState):PropsType => {
    return {
        dialogs: state.dialogPage.dialogs
    }
}

const DialogContainer = connect<PropsType,{},{},AppState>(mapStateToProps)(DialogPage)

export default DialogContainer;