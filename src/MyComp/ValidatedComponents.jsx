import React, {cloneElement} from "react";
import style from "./ValidatedComponents.module.css"

const InputBase=({meta,...props})=>{
    debugger;
    const hasError=meta.touched && meta.error;
    const classError=hasError ? style.formErrorShow:"";
    const className=classError;
    return (
        <div>
            <div>
                {props.text}
                {React.Children.map(props.children, child => (
                    cloneElement(child, { className})
                ))}
            </div>
            {hasError && <span className={style.error}>{meta.error}</span>}
        </div>

    )
}

export const Input=({input,meta,...props})=>{
    return <InputBase {...props} meta={meta}>
        <input {...props} {...input}/>
    </InputBase>
}

export const Textarea=({input,meta,...props})=>{
    return <InputBase {...props} meta={meta}>
        <textarea {...props} {...input}/>
    </InputBase>
}