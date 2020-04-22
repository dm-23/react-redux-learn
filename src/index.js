
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import store from "./BLL/redux-store"
import {Provider} from "react-redux";


 ReactDOM.render(
     <BrowserRouter>
         <Provider store={store}>
             <App/>
         </Provider>

     </BrowserRouter>
     , document.getElementById('root'));


 serviceWorker.unregister();




