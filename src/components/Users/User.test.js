import React from "react"
import ReactDOM from "react-dom"
import {create} from "react-test-renderer"
import User from "./User";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";
import store from "../../BLL/redux-store";
import {BrowserRouter} from "react-router-dom";

let container;
const userData={
    id:1,
    photos:{
        small:null
    },
    followed:false,
    fullName:'Тестовый пользователь',
    status: 'Тестовый статус'
};

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("User component testing",()=>{
    test("Test user component render",()=>{
        act(()=>{
            ReactDOM.render(
                <BrowserRouter>
                    <Provider store={store}>
                        <User user={userData} fetchUsers={[]}/>
                    </Provider>
                </BrowserRouter>
                ,container)
        });
    });

    test("Test user component has test data about User",()=>{
        const component=create(<BrowserRouter>
                <Provider store={store}>
                    <User user={userData} fetchUsers={[]}/>
                </Provider>
        </BrowserRouter>);
        const instance=component.root;
        expect(instance.findByProps({children}))
    });

});