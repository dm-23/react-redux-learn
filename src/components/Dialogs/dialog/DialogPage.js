import React from "react"
import Dialog from "./Dialog"


const DialogPage=(props)=>{
    return <div>
        {props.dialog.map((el)=><Dialog userName={el.userName} userId={el.userId} userActive={el.userActive}/>)}
        </div>

}

export default DialogPage