import React, {useState} from "react";

const ProfileState=props=>{
    const [editMode,setEditMode]=useState(false);
    const [cstatus,setCStatus]=useState("");
    const setEdit=()=>{
        if(props.editEnable){
            setCStatus(props.status);
            setEditMode(true);
        }
    }
    return <div>
        {!editMode?
        <div>
            <span onDoubleClick={()=>setEdit(true)}>{props.status || 'Нет статуса'}</span>
        </div>:
            <div>
                <input autoFocus={true} onBlur={(e)=>{
                    props.updateProfileStatus(e.target.value);
                    setEditMode(false);
                }} value={cstatus} onChange={(e)=>setCStatus(e.target.value)} />
            </div>
        }


    </div>
}



export default ProfileState