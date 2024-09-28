// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './fetchdata';
// import dataReducer from './fetchdata'
const store = configureStore({
reducer:{
data:dataSlice

}
});

export default store;
