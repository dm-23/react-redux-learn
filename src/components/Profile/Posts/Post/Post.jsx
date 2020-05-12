import React from "react";

import s from "./Post.module.css"
const Posts=({message, likeCount})=>{
    return  (
        <div className={s.item}>
            <img/>
            <span>{message}</span> <span>{likeCount ? `лайков: ${likeCount}`:""}</span>
            <div>
                <a href="#">Like</a>
            </div>
        </div>
    )
}

export default Posts;