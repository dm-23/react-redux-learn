import React from "react";
import style from "./ValidatedComponents.module.css"

export const Input=({input, meta,...props})=>{
    const hasError=meta.touched && meta.error;
    const classError=hasError ? style.error:"";
    return (
        <div>
            <div>
                <input {...input} {...props} className={style.formControl + " " + classError }/>
            </div>
            {hasError && <span className={style.error}>{meta.error}</span>}
        </div>

    )
}