import React from "react";
import s from "./Message.module.css"


const Message=(props)=>{
    return  <div className={s.messageItem}>
        <span>{props.message}</span>
    </div>
}

export default Message;