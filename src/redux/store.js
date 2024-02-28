import { configureStore } from "@reduxjs/toolkit";
import AllPostReducer from "./slices/AllPostSlice";
import MyPostSlice from "./slices/MyPostSlice";

export const store = configureStore({
    reducer : {
        AllPost : AllPostReducer,
        MyPost : MyPostSlice
    }  
});