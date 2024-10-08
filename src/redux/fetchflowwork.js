// src/features/workflowSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkflow = createAsyncThunk(
  'workflow/fetchWorkflow',
  async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/data/${id}/`);
    console.log(response.data)
    return response.data;
  }
);

const workflowSlice = createSlice({
  name: 'workflow',
  initialState: {
   view:false,
    Workflow:{
        static_structure:[], // تأكد من أن هذا متواجد
        name: '',
        instruction: {
            name: null,
            Descreption: null,
        },
    },
    stage: [],
    status: 'idle', // يمكن أن يكون 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    viewworkflow:(state,action)=>{
        const filter = state.Workflow.static_structure.filter((item) => {
        
          return item.UUID === action.payload; // يجب أن تكون هذه الشروط صحيحة
        });
      state.stage=filter
      localStorage.setItem('stage', JSON.stringify(filter));
      
      
      },
      ok:(state,action)=>{
     state.view= !state.view
      
      
      }
    // يمكنك إضافة reducers أخرى هنا
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkflow.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkflow.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.Workflow = action.payload; // تعيين البيانات المسترجعة
        //   localStorage.setItem('workflowData', JSON.stringify(action.payload));
      })
      .addCase(fetchWorkflow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const {viewworkflow,ok}=workflowSlice.actions

export default workflowSlice.reducer;
