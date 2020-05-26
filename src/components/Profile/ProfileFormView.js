import React from "react"
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../MyComp/ValidatedComponents";
import style from "../../MyComp/ValidatedComponents.module.css";

const ProfileView=({onCancelButtonClick,handleSubmit,profile,error})=>{
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.formErrorShow}>{error}</div>}
        <Field component={Input}  name={"userId"} type={"hidden"}/>
        <div>
            <div>Полное имя:</div>
            <div>
                <Field component={Input} placeholder={"Имя"} name={"fullName"} />
            </div>
        </div>
        <div>
            <div>Обо мне:</div>
            <div>
                <Field component={Input} name={"aboutMe"} />
            </div>
        </div>
        <div>

            <div>
                <Field component={Input} name={"lookingForAJob"} type={"checkbox"} text={"Ищу работу"}/>
            </div>
        </div>
        <div>
            <div>Описание работы:</div>
            <div>
                <Field component={Textarea} name={"lookingForAJobDescription"} />
            </div>
        </div>
        <div>
            <div>Контакты:</div>
            {Object.keys(profile.contacts).map((key)=>{
                return <div key={key}>
                    {key}:
                    <div>
                        <Field component={Input}  name={"contacts." + key} />
                    </div>
                </div>
            })}
        </div>
        <div>
            <button >Схранить</button>
            <button onClick={onCancelButtonClick}>Отмена</button>
        </div>
    </form>
};
const ProfileViewForm=reduxForm({form:'editProfileForm'})(ProfileView);

export default ProfileViewForm;