import React, {useState} from "react"
import s from "../Profile/Profile.module.css"
const PhotoLoader=({updateAvatar})=>{
    let [fileData,setFileData]=useState(null);
    let [inputValue,setInputValue]=useState('');
    let [imgData,setImgData]=useState('');
    const setAvatar=()=>{
        updateAvatar(fileData);
        setFileData('');
        setImgData('');
    }
    const pictureSelected=(e)=>{
        debugger;
        setFileData(e.target.files[0]);
        const fr=new FileReader();
        fr.onload=function (e){
            setImgData(this.result);
        };
        fr.readAsDataURL(e.target.files[0]);
    }
    return <div>
        <div>Выбрать аватар</div>
        <input type={"file"} onChange={pictureSelected} value={inputValue}/>
        {
            imgData && imgData!==''?
                <div>
                    <img src={imgData} className={s.loadedImage}/>
                    <button onClick={setAvatar}>Установить</button>
                </div>
                :""
        }
    </div>
}

export default PhotoLoader