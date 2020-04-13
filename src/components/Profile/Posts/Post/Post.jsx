import React from "react";

import s from "./Post.module.css"
const Posts=(props)=>{
    return  (
        <div className={s.item}>
            <img/>
            <span>{props.message}</span> <span>{props.likeCount ? `лайков: ${props.likeCount}`:""}</span>
            <div>
                <a href="#">Like</a>
            </div>
        </div>
    )
}

export default Posts;