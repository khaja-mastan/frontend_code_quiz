// // resume_reducer.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     resume: null, // Store the uploaded resume file here
// };

// const resumeSlice = createSlice({
//     name: 'resume',
//     initialState : {
//         resume: null, // Store the uploaded resume file here
//     },
//     reducers: {
//         pushResumeAction: (state, action) => {
//             state.resume = action.payload; // Update the resume state with the uploaded file
//         },
//         // other reducers...
//     },
// });

// export const { pushResumeAction } = resumeSlice.actions;
// export default resumeSlice.reducer;