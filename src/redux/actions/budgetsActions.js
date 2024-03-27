import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/api";

export const getBudgets=createAsyncThunk("budgets/getBudgets",async (_,{rejectWithValue})=>{
    try {
        const res=await api.get('/budget/all')
   
        return res.data.budgets
    } catch (error) {
        console.error("Error fetching budgets:", error);
        return rejectWithValue(error.response.data.message)
    }
})