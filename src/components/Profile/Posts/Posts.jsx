import React from "react";
import Post from "./Post/Post.jsx"
import {reduxForm, Field} from "redux-form";




const Posts=(props)=>{
    const onSubmit=(values)=>{
        debugger;
        props.addPost(values.newPost);

    }
    return  (
        <div>
            <PostReduxForm onSubmit={onSubmit} />

            <div>
                {
                    props.posts.map((el)=><Post message={el.message} likeCount={el.likeCount} id={el.id}/>)
                }

            </div>
        </div>
    )
}

const postForm=(props)=>{
    return <form onSubmit={props.handleSubmit}>
        <Field component={'textarea' } name={'newPost'} placeholder="Текст поста"   />
        <div>
            <button>Добавить</button>
        </div>
    </form>
}

const PostReduxForm=reduxForm({form:'newpostform'})(postForm);

export default Posts;