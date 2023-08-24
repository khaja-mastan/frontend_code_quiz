import React, { useEffect } from "react";
import "./Result.css";
import { Link } from "react-router-dom";
import Resulttable from "./Resulttable";
import { useDispatch, useSelector } from "react-redux";

//---reset Action----
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { attempts_Number, earnPoints_Number, flagResult } from "../helper/helper";
import { usePublishResult } from "../hooks/setResult";


const Result = () => {
  const dispatch = useDispatch();
  const {result,userId} = useSelector(state =>state.result);
  const {queue,answers} = useSelector(state =>state.questions);

  
  useEffect(()=>{
    console.log( earnPoints,attempts,flag);
  })
  const toatalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result , answers) 
  const flag =flagResult(earnPoints , toatalPoints)
  const auth = useSelector(state => state.result.userId)
  
  usePublishResult({
    result  ,
    username :userId ,
    attempts,
    points : earnPoints ,
    achived :flag?"Passed" : "Failed" })
   console.log({
    result  ,
    username :userId ,
    attempts,
    points : earnPoints ,
    achived :flag?"Passed" : "Failed" });
  const onRestart = () => {
    console.log("on Restart");
    dispatch(resetAllAction());
    dispatch(resetResultAction())
  };

  return (
    <>
      <div className="container-sm">
        <div className="boxx">
          <h1 className="title">Quiz Application</h1>
          <div className="result">
            <div className="elements">
              <span>UserName</span>
              <span className="bold">Daily Tuition</span>
            </div>
            <div className="elements">
              <span>Total Quiz Points</span>
              <span className="bold">{toatalPoints}</span>
            </div>
            <div className="elements">
              <span>Total Question</span>
              <span className="bold">{queue.length ||0}</span>
            </div>
            <div className="elements">
              <span>Total Attemts</span>
              <span className="bold">{attempts||0}</span>
            </div>
            <div className="elements">
              <span>Total Earn Points</span>
              <span className="bold">{earnPoints || 0}</span>
            </div>
            <div className="elements">
              <span>Quiz Result</span>
              <span className="bold"  style={{color :`${flag ? 'green': 'red'}`}}>{flag ? 'Passed*': 'Failed'}</span>
            </div>

            <div className="start">
              <Link id="re" to={`${auth?'/home':'/home'}`} onClick={onRestart}>
                Restart
              </Link>
            </div>
          </div>
        </div>
        <Resulttable />
      </div>
    </>
  );
};
export default Result;
