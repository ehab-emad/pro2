// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../db1.json';
import axios from 'axios';
import Workflow from '../pages/workflow';

// إنشاء thunk لجلب البيانات باستخدام GET request
export const fetchData3 = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/data2/"); // يفترض أن data.json موجود في public
  const data=response.data.data.obj_workflow.sessions
  
  return data;
  
  

});

export const sessiondata = createSlice({
  name: 'data',
  initialState: {
    ww: [],
    loading: false,
    error: null,
  },
  reducers: {




  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData3.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData3.fulfilled, (state, action) => {
        state.loading = false;
        state.ww = action.payload;
      })
      .addCase(fetchData3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// تأكد من تصدير الـ reducer بشكل صحيح
export default sessiondata.reducer;
