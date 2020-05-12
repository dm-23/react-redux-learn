import React from "react";
import Post from "./Post/Post.jsx"
import {reduxForm, Field} from "redux-form";
import {maxLengthCreator, required} from "../../../Utils/Validate/simpleValidators";
import { Textarea} from "../../../MyComp/ValidatedComponents";

const Posts=({addPost,posts})=>{
    const onSubmit=(values)=>{
        addPost(values.newPost);
    }

    return  (
        <div>
            <PostReduxForm onSubmit={onSubmit} />
            <div>
                {
                    posts.map((el)=><Post message={el.message} likeCount={el.likeCount} id={el.id}/>)
                }
            </div>
        </div>
    )
}
const maxLength=maxLengthCreator(30);
const postForm=({handleSubmit})=>{

    return <form onSubmit={handleSubmit}>
        <Field component={Textarea} name={'newPost'} placeholder="Текст поста" validate={[required, maxLength]}  />
        <div>
            <button>Добавить</button>
        </div>
    </form>
}

const PostReduxForm=reduxForm({form:'newpostform'})(postForm);

export default Posts;