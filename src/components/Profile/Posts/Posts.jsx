import React from "react";
import Post from "./Post/Post.jsx"
import {reduxForm, Field} from "redux-form";
import {maxLengthCreator, required} from "../../../Utils/Validate/simpleValidators";
import {Input, Textarea} from "../../../MyComp/ValidatedComponents";




const Posts=(props)=>{
    const onSubmit=(values)=>{
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
const maxLenght=maxLengthCreator(30);
const postForm=(props)=>{

    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name={'newPost'} placeholder="Текст поста" validate={[required, maxLenght]}  />
        <div>
            <button>Добавить</button>
        </div>
    </form>
}

const PostReduxForm=reduxForm({form:'newpostform'})(postForm);

export default Posts;