// // src/features/workflowSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchWorkflow1 = createAsyncThunk(
//   'workflow/fetchWorkflow',
//   async (id) => {
//     const response = await axios.get(`http://127.0.0.1:8000/api/data/${id}/`);
//     console.log(response.data)
//     return response.data;
//   }
// );

// const workflowSlice1 = createSlice({
//   name: 'workflow',
//   initialState: {
//     data: JSON.parse(localStorage.getItem('workflowData')) || [],
//     data1: JSON.parse(localStorage.getItem('workflowData')) || [],
//     status: 'idle', // يمكن أن يكون 'idle', 'loading', 'succeeded', 'failed'
//     error: null,
//   },
//   reducers: {
//     viewworkflow:(state,action)=>{
//         const filter = state.data.static_structure.filter((item) => {
        
//           return item.UUID === action.payload; // يجب أن تكون هذه الشروط صحيحة
//         });
//       state.data1=filter
      
      
      
//       }
//     // يمكنك إضافة reducers أخرى هنا
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWorkflow1.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchWorkflow1.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload; // تعيين البيانات المسترجعة
//           localStorage.setItem('workflowData', JSON.stringify(action.payload));
//       })
//       .addCase(fetchWorkflow1.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });
// export const {viewworkflow}=workflowSlice1.actions

// export default workflowSlice1.reducer;
