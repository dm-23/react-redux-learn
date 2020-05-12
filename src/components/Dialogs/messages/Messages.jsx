import React from "react";
import s from "./Messages.module.css";
import Message from "./message/Message";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../Utils/Validate/simpleValidators";
import {Textarea} from "../../../MyComp/ValidatedComponents";

const Messages=({addMessage,messages})=>{
    let btnCl=(values)=>{
        addMessage(values.newMessage);
    }

    return  <div className={s.messages}>
        {
            messages.map((el)=><Message id={el.id} message={el.message}/>)
        }
        <DialogFormRedux onSubmit={btnCl}/>
    </div>
}

const DialogForm=({handleSubmit})=>{
    return <form onSubmit={handleSubmit}>
        <Field component={Textarea} name={'newMessage'} validate={[required]}/>
        <div>
            <button >Добавить</button>
        </div>
    </form>
}

const DialogFormRedux=reduxForm({form:'newMessage'})(DialogForm);

export default Messages;