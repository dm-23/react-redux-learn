import React from "react";
import s from "./Dialog.module.css"
import {BrowserRouter, NavLink} from "react-router-dom";

const Dialog=(props)=>{
    return <div className={s.dialogItem}>
            <div>
                <img />
                <NavLink activeClassName={s.active} to={`/dialogs/${props.userId}`}>{props.userName}</NavLink>

            </div>
        </div>
}

export default Dialog;