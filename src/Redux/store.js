import appReducers from "./reducer/reducerIndex"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:appReducers
})

export  default store;