import React, {useState} from "react";

const ProfileState=({editEnable,status,updateProfileStatus})=>{
    const [editMode,setEditMode]=useState(false);
    const [cstatus,setCStatus]=useState("");
    const updateStatus=()=>{
        updateProfileStatus(cstatus);
        setEditMode(false);
    };
    const setEdit=()=>{
        if(editEnable){
            setCStatus(status);
            setEditMode(true);
        }
    }
    return <div>
        {!editMode?
        <div>
            <span onDoubleClick={()=>setEdit(true)}>{status || 'Нет статуса'}</span>
        </div>:
            <div>
                <input autoFocus={true} onBlur={updateStatus} value={cstatus} onChange={(e)=>setCStatus(e.target.value)} />
            </div>
        }


    </div>
}



export default ProfileState