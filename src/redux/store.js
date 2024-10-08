// store.js
import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './fetchdata';
import workflowSlice from './fetchflowwork'
import sessiondata from './fetchsession';
// import dataReducer from './fetchdata'
const store = configureStore({
reducer:{
data:dataSlice,
workflow:workflowSlice,
sessions:sessiondata
}
});

export default store;
