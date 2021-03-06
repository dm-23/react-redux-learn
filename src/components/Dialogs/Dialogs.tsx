import React from "react";
import s from "./Dialogs.module.css"
import DialogContainer from "./dialog/DialogContainer";
import MessagesContainer from "./messages/MessagesContainer";


const Dialogs=()=>{

                return  <div className={s.dialogs}>
                    <div className={s.dialogItems}>
                        <DialogContainer/>

                    </div>
                    <div className={s.messages}>
                        <MessagesContainer/>
                    </div>
                </div>
}

export default Dialogs;