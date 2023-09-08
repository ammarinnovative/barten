import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../reducers/UserReducer";

const store = configureStore({
    reducer:{
        user:UserSlice
    }
})


export default store;





// import { configureStore } from '@reduxjs/toolkit';

// import UserSlice from "../reducers/UserReducer";

// const store = configureStore({
//     reducer: {
//       user:UserSlice
//     },
// });

// export default store;