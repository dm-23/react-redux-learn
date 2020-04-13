import React from "react"
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../Utils/Validate/simpleValidators";
import {Input} from "../../MyComp/ValidatedComponents";
import {connect} from "react-redux";
import {login} from "../../BLL/reducers/authReducer";
import {Redirect} from "react-router-dom";
import style from "../../../src/MyComp/ValidatedComponents.module.css"


const Login=(props)=>{
    const onSubmit=(values)=>{
        props.login(values.login, values.password,values.rememberMe);
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginFormRedux onSubmit={onSubmit} {...props}/>
        </div>
    )
}
const maxLength10=maxLengthCreator(50);
const LoginForm=(props)=>{
    debugger;
    if(props.isAuth){
        return <Redirect to="/profile"/>
    }
    return <form onSubmit={props.handleSubmit}>
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
                {props.error && <div className={style.formErrorShow}>{props.error}</div>}
            </div>
            <button>Ok</button>
        </form>
}

const LoginFormRedux=reduxForm({form:'loginForm'})(LoginForm);

const mapStateToProps=(state)=>{
    return ({isAuth:state.auth.isAuth})
}

export default connect(mapStateToProps,{login})(Login)