import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';




export function attempts_Number(result){
   return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result , answers){
    return result.map((element ,i)=> answers[i] ===element).filter(i=>i).map(i=>10).reduce((prev ,cur)=>prev + cur,0)
}

export function flagResult (earnPoints , toatalPoints){
    return (toatalPoints * 50 / 100) < earnPoints ;
}

export function CheckUserExist({children}){
     let auth = useSelector(state => state.result.userId);
     return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

//------get server Data---
export async function getServerData(url , Callback){
    const data = await (await axios.get(url))?.data;
    return Callback? Callback(data):data ;

}

//---post server Data ------
export async function postServerData(url , result ,Callback){
    const data = await (await axios.post(url , result))?.data;
    return Callback? Callback(data) : data;
}

