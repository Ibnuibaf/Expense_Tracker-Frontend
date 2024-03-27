import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const getUser=createAsyncThunk("user/getUser",async (_,{rejectWithValue})=>{
    try {
        const res=await api.get('/user/')
        return res.data.user
    } catch (error) {
        console.error("Error fetching user:", error);
        return rejectWithValue(error.response.data.message)
    }
})