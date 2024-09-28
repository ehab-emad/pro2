// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../db1.json';

// إنشاء thunk لجلب البيانات باستخدام GET request
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  // const response = await axios.get(db); // يفترض أن data.json موجود في public
  const data=db.data.objs_workflow
  console.log(db);
  return data;
  
  

});

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    ALLworkflow: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.ALLworkflow = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// تأكد من تصدير الـ reducer بشكل صحيح
export default dataSlice.reducer;
