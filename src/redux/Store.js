import  {combineReducers,configureStore} from '@reduxjs/toolkit';

// -- call reducer--
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';


const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer,
})

// --- creat store with reducers

export default configureStore({reducer:rootReducer});
