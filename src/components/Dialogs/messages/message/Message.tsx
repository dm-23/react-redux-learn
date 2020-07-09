import React from "react";
import s from "./Message.module.css"
import {MessageType} from "../../../../types/types";


const Message=({message}:MessageType)=>{
    return  <div className={s.messageItem}>
        <span>{message}</span>
    </div>
}

export default Message;