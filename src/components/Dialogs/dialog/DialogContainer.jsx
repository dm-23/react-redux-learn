import React from "react";
import {connect} from "react-redux";
import DialogPage from "./DialogPage"

const mapState=(state)=>{
    return {
        dialog:state.dialogPage.dialogs
    }
}

const mapDispatch=(dispatch)=>{
    return {}
}


const DialogContainer = connect(mapState,mapDispatch)(DialogPage)

        export default DialogContainer;