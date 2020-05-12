import React from "react"
import Dialog from "./Dialog"


const DialogPage=({dialogs})=>{
    return <div>
        {dialogs.map((el)=><Dialog userName={el.userName} userId={el.userId} userActive={el.userActive}/>)}
        </div>

}

export default DialogPage