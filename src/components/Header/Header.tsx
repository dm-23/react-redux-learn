import React from "react";
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

type PropsType={
    id:number | null
    login:string |null,
    logout:()=>void
}


const Header:React.FC<PropsType>=({id,login,logout})=>{

    return  <header className={s.header}>
        <img/>
        <div className={s.auth}>
            {id===null ?
                <NavLink to={"/login"}>Login</NavLink>:
                <div><span>{login}</span><div>
                    <button onClick={logout}>Logout</button>
                </div></div>}
        </div>
    </header>
}

export default Header