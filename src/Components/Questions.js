import React, { useEffect, useState } from "react";
// import Data from "../database/Data";
import './Quiz.css';

//--Custom hook
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { useDispatch, useSelector } from "react-redux";
import { UpdateResult } from "../hooks/setResult";

const Questions=({onChecked})=>{

    const [checked ,setChecked] = useState(undefined);
    const[{isLoading , apiData , serverError}] = useFetchQuestion();
    const dispatch = useDispatch();
    // useSelector(state =>console.log(state))
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const {trace }= useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);

    useEffect(()=>{
        // console.log(result[trace]);
        // console.log({trace ,checked});
        dispatch(UpdateResult({trace ,checked}));
    },[checked])

    function onSelect(i) {
        onChecked(i);
        setChecked(i);
    } 
    
    if(isLoading) return <h3 className="text">isLoading</h3>
    if(serverError) return <h3 className="text">{serverError || "Unknown Error"}</h3>

    return(
        <>
        <div className="question">
           <h1 className="text-light">{questions?.question}</h1>
           <ul className="opt" key={questions?.id}>
              { 
                questions?.options.map((q, i )=>(
                    

            <li id="li" key={i}>
                <input
                  name="checked"
                  id={`q${i}-option`}
                  type="radio"
                  value={checked}
                  onChange={()=>onSelect(i)}
                  />
                <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
                <div className={`check ${result[trace] == i ? 'checked':'' }` } 
                ></div>
            </li>
                  
            
            ))
        } 
           </ul>
        </div>
        </>
    )
}
export default Questions;