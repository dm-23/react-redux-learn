import React from "react";
import s from "./Dialog.module.css"
import {NavLink} from "react-router-dom";

const Dialog=({userId,userName})=>{
    return <div className={s.dialogItem}>
            <div>
                <img />
                <NavLink activeClassName={s.active} to={`/dialogs/${userId}`}>{userName}</NavLink>

            </div>
        </div>
}

export default Dialog;