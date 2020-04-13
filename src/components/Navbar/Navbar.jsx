import React from "react";
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";
import Friend from "./Friends/Friends";
import {StoreContext} from "../../BLL/redux-store";
import {connect} from "react-redux";

const Navbar=()=>{
    return  <nav className={s.nav}>

                    <div className={`${s.item} ${s.active}`}>
                        <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
                    </div>

                    <div className={s.item}>
                        <NavLink to="/dialogs" activeClassName={s.active}>Messages</NavLink>
                    </div>

                    <div className={s.item}> <a>News</a></div>

                    <div className={s.item}> <a>Music</a></div>

                    <div className={s.item}>
                        <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
                    </div>

                    <div className={s.item}><a>Settings</a></div>

                    <div className={s.friends}>
                        <span>Friends</span>
                        <div className={s.friendsImg}>
                            {/*{state.sideBar.friends.map((el)=><Friend id={el.id} name={el.name}/>)}*/}
                        </div>
                    </div>
                </nav>

}

export default Navbar;