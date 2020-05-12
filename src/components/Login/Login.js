import React from "react"
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../Utils/Validate/simpleValidators";
import {Input} from "../../MyComp/ValidatedComponents";
import {connect} from "react-redux";
import {login} from "../../BLL/reducers/authReducer";
import {Redirect} from "react-router-dom";
import style from "../../../src/MyComp/ValidatedComponents.module.css"


const Login=({login,isAuth,error})=>{
    const onSubmit=(values)=>{
        login(values.login, values.password,values.rememberMe);
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginFormRedux onSubmit={onSubmit} isAuth={isAuth} error={error}/>
        </div>
    )
}
const maxLength10=maxLengthCreator(50);
const LoginForm=({isAuth,handleSubmit,error})=>{
    if(isAuth){
        return <Redirect to="/profile"/>
    }
    return <form onSubmit={handleSubmit}>
            <span>Login: </span>
            <div>
                <Field component={Input} name="login" type="text" placeholder="Логин"
                validate={[required,maxLength10]}
                />
            </div>
            <span>Password: </span>
            <div>
                <Field component={Input} type="password" name="password"
                       validate={[required,maxLength10]}
                />
            </div>
            <div>
                <Field component={"input"} type={"checkbox"} name={"rememberMe"}/> Запомнить
            </div>
            <div>
                {error && <div className={style.formErrorShow}>{error}</div>}
            </div>
            <button>Ok</button>
        </form>
}

const LoginFormRedux=reduxForm({form:'loginForm'})(LoginForm);

const mapStateToProps=(state)=>{
    return ({isAuth:state.auth.isAuth})
}

export default connect(mapStateToProps,{login})(Login)