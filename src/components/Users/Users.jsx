import React from "react";
import Paginator from "../../MyComp/Paginator";
import UserList from "./UserList";

let Users=({pages,onPageChange,currentPage,users,fetchUsers,unfollowSuccess,followSuccess})=>{
    debugger;
    return <div >
        <Paginator pages={pages} onPageChange={onPageChange} currentPage={currentPage}/>
        {
            <UserList users={users} fetchUsers={fetchUsers} unfollowSuccess={unfollowSuccess} followSuccess={followSuccess}/>

        }
    </div>
}


export default Users