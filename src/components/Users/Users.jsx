import React from "react";
import s from "./Users.module.css"
import {NavLink} from "react-router-dom";

let Users=(props)=>{
    let pagesCount=Math.ceil(props.totalCount/props.usersOnPage);
    let pages=[];
    let startPage=props.currentPage-2>1?props.currentPage-2:1;
    let forCount=pagesCount>10?pagesCount-props.currentPage<10?pagesCount-props.currentPage:10:pagesCount;
    for(let i=startPage;i<=startPage+forCount;i++){
        pages.push(i);
    }
    if(forCount<pagesCount){
        pages=[...pages,"...",pagesCount]
    }
    if(pages[0]>1){
        pages=[1,"...",...pages]
    }
    return <div >
        {<div>
            {

                pages.map((p)=>{

                    return p==='...' ? <span className={`${s.pages}`}>{p}</span>:
                        <span onClick={(e)=>props.onPageChange(p)} className={`${s.pages} ${props.currentPage===p?s.current:""}`}>{p}</span>
                })}


        </div>}
        {
            props.users.map((u) => {
                return <div className={s.wrapper}>
                    <div className={s.col1}>
                        <div>
                            <NavLink to={"/profile/" + u.id}>
                                <img src={u.photos.small!==null?u.photos.small:"data:image/jpeg;base64,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"} className={s.photo}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ?
                                <button disabled={props.fetchUsers.some((el)=>el===u.id)} onClick={() => {
                                    props.unfollowSuccess(u.id)
                                }}>Unfollow</button> :
                                <button disabled={props.fetchUsers.some((el)=>el===u.id)} onClick={() => {
                                    props.followSuccess(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </div>
                    <div className={s.col2}>
                        <div>
                            <span>{u.fullName}</span>
                            <span>{"u.location.country"}</span>
                        </div>
                        <div>
                            <span>{u.status}</span>
                            <span>{"u.location.city"}</span>
                        </div>
                    </div>
                </div>
            })
        }


    </div>
}


export default Users