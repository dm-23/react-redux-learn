import React from "react";
import {connect} from "react-redux";
import DialogPage from "./DialogPage"

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogPage.dialogs
    }
}

const DialogContainer = connect(mapStateToProps)(DialogPage)

export default DialogContainer;