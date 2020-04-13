import React from "react";

export const required=(value)=>{
    return value ? undefined:'Значение должно быть указано';
}

export const maxLengthCreator=(maxLength)=>(value)=>{
    return !value || value.length>maxLength  ? `Длинна поля ${maxLength} символов`:undefined;
}