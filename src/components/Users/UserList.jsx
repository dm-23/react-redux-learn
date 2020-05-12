import React from "react"
import User from "./User";

const UserList = ({users, fetchUsers, unfollowSuccess, followSuccess}) => {
    debugger;
    return <div>
        {users.map((u) =>
            <User user={u} fetchUsers={fetchUsers} unfollowSuccess={unfollowSuccess} followSuccess={followSuccess} />
        )}
    </div>

}

export default UserList;