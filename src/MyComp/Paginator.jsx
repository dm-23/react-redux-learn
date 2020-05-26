import React from "react";
import s from "../components/Users/Users.module.css";

const Paginator=({pages,onPageChange,currentPage})=>{
    return <div>
        {
            pages.map((p)=>{
                return p==='...' ? <span key={p} className={`${s.pages}`}>{p}</span>:
                    <span key={p} onClick={(e)=>onPageChange(p)} className={`${s.pages} ${currentPage===p?s.current:""}`}>{p}</span>
            })}
    </div>
}

export default Paginator;

