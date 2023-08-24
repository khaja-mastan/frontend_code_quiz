import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
// import data,{answers} from '../database/Data';

//---redux action
import * as Action from "../redux/question_reducer";
import { getServerData } from "../helper/helper";

//----fetch question hook to fetch api and set value to store
export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });
  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    //------async function to get backend data

    (async () => {
      try {
        const [{ questions, answers }] = await getServerData(
          `${process.env.REACT_APP_BACKEND_HOSTNAME}/api/questions`,
          (data) => data
        );
        console.log({ questions, answers });
        console.log(questions.length);
        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: questions }));

          //---dispatch an action
          console.log(
            dispatch(Action.startExamAction({ question: questions, answers }))
          );
        } else {
          throw new Error("No Question is Available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};

//---move action Dispatch function
export const moveNextAction = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};
export const movePrevAction = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};
