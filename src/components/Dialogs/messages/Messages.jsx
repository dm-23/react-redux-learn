import React from "react";
import s from "./Messages.module.css";
import Message from "./message/Message";
import {Field, reduxForm} from "redux-form";

const Messages=(props)=>{
    debugger;
    let btnCl=(values)=>{
        props.addMessage(values.newMessage);
    }

    return  <div className={s.messages}>
        {
            props.messages.map((el)=><Message id={el.id} message={el.message}/>)
        }
        <DialogFormRedux onSubmit={btnCl}/>
    </div>
}

const DialogForm=(props)=>{
    return <form onSubmit={props.handleSubmit}>
        <Field component={'textarea'} name={'newMessage'}/>
        <div>
            <button >Добавить</button>
        </div>
    </form>
}

const DialogFormRedux=reduxForm({form:'newMessage'})(DialogForm);

export default Messages;