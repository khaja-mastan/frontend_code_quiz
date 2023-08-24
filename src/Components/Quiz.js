import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Questions from "./Questions";
import { Navigate } from "react-router-dom";
//---redux store import
import { useDispatch, useSelector } from "react-redux";
import { moveNextAction, movePrevAction } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";
import { logDOM } from "@testing-library/react";

const Quiz = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(undefined);
  const state = useSelector((state) => state.questions.trace);
  const total = useSelector((state) => state.questions.queue.length);
  const { trace, queue } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  // useEffect(()=>{
  //     console.log(result)
  //     console.log(state);
  // })

  //-----move next and prev action ---
  const onNext = () => {
    console.log("On Next");
    if (state < total){ dispatch(moveNextAction());
    //---- insert  new result --
    if (result.length <= trace){ dispatch(PushAnswer(checked));}
    }
   setChecked(undefined);

};

  const onPrev = () => {
    console.log("On Prev");
    if (state > 0) {
      dispatch(movePrevAction());
    }
  };
  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace="true" />;
  }

  return (
    <>
      <div className="container-smm">
        <div className="boxxx">
          <h2 className="title1">Quiz Application</h2>
          <Questions onChecked={onChecked} />
          <div className="flex">
            {trace > 0 ? (
              <button className="btn prev" onClick={onPrev}>
                Prev
              </button>
            ) : (
              <div></div>
            )}
            <h2 className="index">
              {state + 1}/{total}
            </h2>
            <button className="btn next" onClick={onNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Quiz;
