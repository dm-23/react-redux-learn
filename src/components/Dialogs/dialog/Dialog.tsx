import React from "react";
import s from "./Dialog.module.css"
import {NavLink} from "react-router-dom";


type PropsType={
    userId:number
    userName:string
}

const Dialog:React.FC<PropsType>=({userId,userName}:PropsType)=>{
    return <div className={s.dialogItem}>
            <div>
                <img />
                <NavLink activeClassName={s.active} to={`/dialogs/${userId}`}>{userName}</NavLink>

            </div>
        </div>
}

export default Dialog;