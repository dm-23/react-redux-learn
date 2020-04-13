import React from "react";
import s from "./Friends.module.css"

const Friend=(props)=>{
    return <div className={s.item}>
        <img/>
        <div itemId={props.id}>
            {props.name}
        </div>
    </div>

}

export default Friend;